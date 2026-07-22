import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { assertNoLfsPointers, findLfsPointers } from "./lfs-pointer-guard.mjs";

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

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
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
  console.log("- scan: public/ after the pre-build prune");
  console.log("- include: exact remaining Git LFS pointer paths only");
  console.log("- cache: reuse the deployment snapshot's default .git/lfs store");
  console.log(`- authentication: Replit secret ${lfsTokenVariable} via temporary askpass`);
  console.log(`- concurrent transfers: ${lfsConcurrentTransfers}`);
  console.log("- progress: forced for non-interactive deployment logs");
  console.log(`- temporary authentication helper: ${path.join(os.tmpdir(), "sipopedia-runtime-lfs-*")}`);
  console.log("");
  console.log("Post-build cleanup:");
  for (const relativePath of postBuildRemovablePaths) {
    console.log(`- ${relativePath}`);
  }
  console.log("- npm prune --omit=dev");
  process.exit(0);
}

async function buildDeployment() {
  const publicRoot = path.join(repositoryRoot, "public");
  const lfsToken = process.env[lfsTokenVariable];
  let temporaryLfsDirectory = null;

  delete process.env[lfsTokenVariable];

  try {
    const pointerPaths = await findLfsPointers([publicRoot]);

    if (pointerPaths.length === 0) {
      console.log("Runtime public assets are already hydrated; skipping Git LFS pull.");
    } else {
      if (!lfsToken) {
        console.error(
          `Missing required Replit deployment secret ${lfsTokenVariable}; ` +
            `${pointerPaths.length} Git LFS pointer file(s) still require hydration.`
        );
        return 1;
      }

      const exactPointerIncludes = pointerPaths
        .map((pointerPath) => path.relative(repositoryRoot, pointerPath).split(path.sep).join("/"))
        .join(",");
      temporaryLfsDirectory = await mkdtemp(path.join(os.tmpdir(), "sipopedia-runtime-lfs-"));
      const temporaryAskPass = path.join(temporaryLfsDirectory, "git-askpass.sh");

      await writeFile(temporaryAskPass, askPassScript, {
        encoding: "utf8",
        mode: 0o700
      });

      console.log(
        `Hydrating ${pointerPaths.length} remaining runtime Git LFS pointer file(s) before the Vite build.`
      );
      const lfsEnvironment = {
        ...process.env,
        [lfsTokenVariable]: lfsToken,
        GIT_ASKPASS: temporaryAskPass,
        GIT_TERMINAL_PROMPT: "0",
        GIT_LFS_FORCE_PROGRESS: "1",
        GIT_TRACE: "0",
        GIT_TRACE_CURL: "0",
        GIT_CURL_VERBOSE: "0"
      };

      let lfsExitCode;
      try {
        lfsExitCode = await runCommand("git", [
          "-c",
          "credential.helper=",
          "-c",
          `lfs.concurrenttransfers=${lfsConcurrentTransfers}`,
          "lfs",
          "pull",
          `--include=${exactPointerIncludes}`,
          "--exclude=",
          "origin"
        ], lfsEnvironment);
      } finally {
        delete lfsEnvironment[lfsTokenVariable];
      }

      if (lfsExitCode !== 0) {
        console.error("Git LFS hydration failed; refusing to create a deployment with pointer files.");
        return lfsExitCode;
      }

      await assertNoLfsPointers([publicRoot], {
        displayRoot: repositoryRoot
      });
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
    if (temporaryLfsDirectory) {
      await rm(temporaryLfsDirectory, recursiveRemoveOptions);
    }
  }
}

process.exit(await buildDeployment());
