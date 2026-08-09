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

function commitMetadata(rev) {
  const output = git(["show", "-s", "--format=%H%x00%an%x00%s%x00%cI", rev]);
  const [sha = "", author = "", subject = "", commitTime = ""] = output.split("\0");
  return { sha, author, subject, commitTime };
}

function isReplitPublishCommit(metadata) {
  return /replit/i.test(metadata.author) && /^published your app$/i.test(metadata.subject);
}

function sourceCommitMetadata(currentCommit) {
  const history = git(["log", "--format=%H%x00%an%x00%s%x00%cI", "-n", "30"]);
  if (!history) return commitMetadata(currentCommit);

  const commits = history
    .split(/\r?\n/)
    .map((line) => {
      const [sha = "", author = "", subject = "", commitTime = ""] = line.split("\0");
      return { sha, author, subject, commitTime };
    })
    .filter((metadata) => /^[a-f0-9]{40}$/i.test(metadata.sha));

  return commits.find((metadata) => !isReplitPublishCommit(metadata)) ?? commitMetadata(currentCommit);
}

const commit = git(["rev-parse", "HEAD"]);
if (!/^[a-f0-9]{40}$/i.test(commit)) {
  throw new Error("Unable to resolve the Git commit for the RGRD build manifest.");
}

const branch = git(["branch", "--show-current"]) || process.env.GITHUB_REF_NAME || "detached";
const repository = process.env.GITHUB_REPOSITORY || githubRepository(git(["remote", "get-url", "origin"]));
const commitTime = git(["show", "-s", "--format=%cI", "HEAD"]);
const sourceCommit = sourceCommitMetadata(commit);
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
  sourceCommit: sourceCommit.sha,
  sourceCommitTime: sourceCommit.commitTime,
  sourceCommitSubject: sourceCommit.subject,
  builtAt: new Date().toISOString(),
  provider
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`RGRD manifest written for ${repository}@${commit.slice(0, 12)}.`);
