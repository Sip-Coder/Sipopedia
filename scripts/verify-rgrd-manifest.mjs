import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const manifestPath = path.resolve(process.argv[2] ?? "dist/rgrd.json");
const requestedCommit = process.argv[3] ?? process.env.GITHUB_SHA ?? "";
const expectedRepository = process.env.RGRD_REPOSITORY ?? "Sip-Coder/Sipopedia";
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

let expectedCommit = requestedCommit.trim();
if (!expectedCommit) {
  expectedCommit = execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
    windowsHide: true
  }).trim();
}

if (manifest.schemaVersion !== 1) {
  throw new Error(`Unexpected RGRD manifest schema: ${manifest.schemaVersion}`);
}
if (!/^[a-f0-9]{40}$/i.test(manifest.commit ?? "")) {
  throw new Error("RGRD manifest does not contain a full Git commit SHA.");
}
if (manifest.commit.toLowerCase() !== expectedCommit.toLowerCase()) {
  throw new Error(`RGRD manifest commit ${manifest.commit} does not match ${expectedCommit}.`);
}
if (manifest.repository !== expectedRepository) {
  throw new Error(
    `RGRD manifest repository ${manifest.repository ?? "missing"} does not match ${expectedRepository}.`
  );
}
if (!Number.isFinite(Date.parse(manifest.commitTime))) {
  throw new Error("RGRD manifest commit timestamp is invalid.");
}
if (!Number.isFinite(Date.parse(manifest.builtAt))) {
  throw new Error("RGRD manifest build timestamp is invalid.");
}
if (!["github-actions", "local", "replit"].includes(manifest.provider)) {
  throw new Error(`RGRD manifest provider is invalid: ${manifest.provider ?? "missing"}.`);
}

console.log(`RGRD manifest verified for ${manifest.repository}@${manifest.commit.slice(0, 12)}.`);
