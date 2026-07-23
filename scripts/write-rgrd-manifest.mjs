import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(repositoryRoot, "dist", "rgrd.json");

function git(args) {
  try {
    return execFileSync("git", args, {
      cwd: repositoryRoot,
      encoding: "utf8",
      windowsHide: true
    }).trim();
  } catch {
    return "";
  }
}

function githubRepository(remoteUrl) {
  const match = remoteUrl.match(/github\.com(?::|\/)([^/]+)\/([^/]+?)(?:\.git)?$/i);
  return match ? `${match[1]}/${match[2]}` : "unknown";
}

const commit = git(["rev-parse", "HEAD"]);
if (!/^[a-f0-9]{40}$/i.test(commit)) {
  throw new Error("Unable to resolve the Git commit for the RGRD build manifest.");
}

const branch = git(["branch", "--show-current"]) || process.env.GITHUB_REF_NAME || "detached";
const repository = process.env.GITHUB_REPOSITORY || githubRepository(git(["remote", "get-url", "origin"]));
const commitTime = git(["show", "-s", "--format=%cI", "HEAD"]);
const provider = process.env.REPL_ID
  ? "replit"
  : process.env.GITHUB_ACTIONS === "true"
    ? "github-actions"
    : "local";

const manifest = {
  schemaVersion: 1,
  repository,
  commit,
  branch,
  commitTime,
  builtAt: new Date().toISOString(),
  provider
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`RGRD manifest written for ${repository}@${commit.slice(0, 12)}.`);
