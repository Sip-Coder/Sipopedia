import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

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
  process.exit(0);
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const buildExitCode = await new Promise((resolve, reject) => {
  const build = spawn(npmCommand, ["run", "build"], {
    cwd: repositoryRoot,
    env: process.env,
    stdio: "inherit"
  });

  build.once("error", reject);
  build.once("exit", (code) => resolve(code ?? 1));
});

process.exit(buildExitCode);
