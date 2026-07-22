import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { assertNoLfsPointers } from "./lfs-pointer-guard.mjs";

const dryRun = process.argv.includes("--dry-run");
const deploymentMarker = process.env.SIP_STUDIES_DEPLOYMENT_BUILD;
const replitProjectId = process.env.REPL_ID;
const lfsTokenVariable = "SIPOPEDIA_GITHUB_LFS_TOKEN";

if (!dryRun && (deploymentMarker !== "1" || !replitProjectId)) {
  console.error(
    "Refusing to prune files outside a disposable Replit deployment snapshot. " +
      "Use `npm run build` for local builds."
  );
  process.exit(1);
}

if (!dryRun && process.platform === "win32") {
  console.error(
    "Refusing to prune files on Windows. The Replit deployment build runs in a disposable Linux snapshot."
  );
  process.exit(1);
}

if (!dryRun && !process.env[lfsTokenVariable]) {
  console.error(
    `Missing required Replit deployment secret ${lfsTokenVariable}; ` +
      "GitHub LFS assets cannot be hydrated without it."
  );
  process.exit(1);
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const runtimeLfsInclude = "public/**";
const runtimeLfsExclude = "public/infographics/DNU - Archived -Infographics/**";
const lfsConcurrentTransfers = 16;
const recursiveRemoveOptions = {
  recursive: true,
  force: true,
  maxRetries: 8,
  retryDelay: 250
};
const removablePaths = [
  "dist",
  "DUMP IN",
  "DUMP-IN",
  "Checkpoint_Img",
  "archive",
  "attached_assets",
  "docs",
  "output",
  "public-essential",
  "review",
  "terminology",
  "tmp",
  path.join("public", "infographics", "DNU - Archived -Infographics")
];
const postBuildRemovablePaths = [
  "public",
  path.join(".git", "lfs", "objects")
];
const askPassScript = `#!/bin/sh
case "$1" in
  *Username*github.com*|*username*github.com*)
    printf '%s\\n' 'x-access-token'
    ;;
  *Password*github.com*|*password*github.com*)
    printf '%s\\n' "$${lfsTokenVariable}"
    ;;
  *)
    exit 1
    ;;
esac
`;

function runCommand(command, args, environment = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repositoryRoot,
      env: environment,
      stdio: "inherit"
    });

    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
}

function resolveRepositoryPath(relativePath) {
  const target = path.resolve(repositoryRoot, relativePath);
  const repositoryPrefix = `${repositoryRoot}${path.sep}`;

  if (!target.startsWith(repositoryPrefix)) {
    throw new Error(`Refusing to remove a path outside the repository: ${target}`);
  }

  return target;
}

console.log(
  dryRun
    ? "Replit deployment prune preview:"
    : "Pruning non-runtime files from the disposable Replit deployment snapshot:"
);

for (const relativePath of removablePaths) {
  console.log(`- ${relativePath}`);
  if (!dryRun) {
    await rm(resolveRepositoryPath(relativePath), recursiveRemoveOptions);
  }
}

if (dryRun) {
  console.log("");
  console.log("Runtime Git LFS hydration:");
  console.log(`- include: ${runtimeLfsInclude}`);
  console.log(`- exclude: ${runtimeLfsExclude}`);
  console.log(`- authentication: Replit secret ${lfsTokenVariable} via temporary askpass`);
  console.log(`- concurrent transfers: ${lfsConcurrentTransfers}`);
  console.log("- progress: forced for non-interactive deployment logs");
  console.log(`- temporary storage: ${path.join(os.tmpdir(), "sipopedia-runtime-lfs-*")}`);
  console.log("");
  console.log("Post-build cleanup:");
  for (const relativePath of postBuildRemovablePaths) {
    console.log(`- ${relativePath}`);
  }
  console.log("- npm prune --omit=dev");
  process.exit(0);
}

async function buildDeployment() {
  const temporaryLfsStorage = await mkdtemp(path.join(os.tmpdir(), "sipopedia-runtime-lfs-"));
  const temporaryAskPass = path.join(temporaryLfsStorage, "git-askpass.sh");

  try {
    await writeFile(temporaryAskPass, askPassScript, {
      encoding: "utf8",
      mode: 0o700
    });

    console.log("Hydrating runtime Git LFS assets before the Vite build.");
    const lfsEnvironment = {
      ...process.env,
      GIT_ASKPASS: temporaryAskPass,
      GIT_TERMINAL_PROMPT: "0",
      GIT_LFS_FORCE_PROGRESS: "1",
      GIT_TRACE: "0",
      GIT_TRACE_CURL: "0",
      GIT_CURL_VERBOSE: "0"
    };
    delete process.env[lfsTokenVariable];

    let lfsExitCode;
    try {
      lfsExitCode = await runCommand("git", [
        "-c",
        "credential.helper=",
        "-c",
        `lfs.concurrenttransfers=${lfsConcurrentTransfers}`,
        "-c",
        `lfs.storage=${temporaryLfsStorage}`,
        "lfs",
        "pull",
        `--include=${runtimeLfsInclude}`,
        `--exclude=${runtimeLfsExclude}`,
        "origin"
      ], lfsEnvironment);
    } finally {
      delete lfsEnvironment[lfsTokenVariable];
    }

    if (lfsExitCode !== 0) {
      console.error("Git LFS hydration failed; refusing to create a deployment with pointer files.");
      return lfsExitCode;
    }

    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    const buildExitCode = await runCommand(npmCommand, ["run", "build"]);

    if (buildExitCode !== 0) {
      return buildExitCode;
    }

    await assertNoLfsPointers([path.join(repositoryRoot, "dist")], {
      displayRoot: repositoryRoot
    });

    console.log("Removing hydrated source copies from the disposable snapshot.");
    for (const relativePath of postBuildRemovablePaths) {
      await rm(resolveRepositoryPath(relativePath), recursiveRemoveOptions);
    }

    console.log("Pruning development-only packages from the production runtime.");
    return await runCommand(npmCommand, ["prune", "--omit=dev"]);
  } finally {
    await rm(temporaryLfsStorage, recursiveRemoveOptions);
  }
}

process.exit(await buildDeployment());
