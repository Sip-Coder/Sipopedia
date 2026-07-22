import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { assertNoLfsPointers } from "./lfs-pointer-guard.mjs";

const dryRun = process.argv.includes("--dry-run");
const deploymentMarker = process.env.SIP_STUDIES_DEPLOYMENT_BUILD;
const replitProjectId = process.env.REPL_ID;

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
const runtimeLfsInclude = "public/**";
const runtimeLfsExclude = "public/infographics/DNU - Archived -Infographics/**";
const removablePaths = [
  "dist",
  path.join(".git", "lfs", "objects"),
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
  "public"
];

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repositoryRoot,
      env: process.env,
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
    await rm(resolveRepositoryPath(relativePath), { recursive: true, force: true });
  }
}

if (dryRun) {
  console.log("");
  console.log("Runtime Git LFS hydration:");
  console.log(`- include: ${runtimeLfsInclude}`);
  console.log(`- exclude: ${runtimeLfsExclude}`);
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

  try {
    console.log("Hydrating runtime Git LFS assets before the Vite build.");
    const lfsExitCode = await runCommand("git", [
      "-c",
      `lfs.storage=${temporaryLfsStorage}`,
      "lfs",
      "pull",
      `--include=${runtimeLfsInclude}`,
      `--exclude=${runtimeLfsExclude}`,
      "origin"
    ]);

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
      await rm(resolveRepositoryPath(relativePath), { recursive: true, force: true });
    }

    console.log("Pruning development-only packages from the production runtime.");
    return await runCommand(npmCommand, ["prune", "--omit=dev"]);
  } finally {
    await rm(temporaryLfsStorage, { recursive: true, force: true });
  }
}

process.exit(await buildDeployment());
