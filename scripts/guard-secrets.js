#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const skipDirs = new Set([".git", "node_modules", "dist", ".codex-runlogs"]);
const maxScanBytes = 64 * 1024 * 1024;
const maxGitBlobBytes = 10 * 1024 * 1024;
const lfsPointerHeader = "version https://git-lfs.github.com/spec/v1";
const textExtensions = new Set([
  ".cjs",
  ".cmd",
  ".css",
  ".csv",
  ".env",
  ".html",
  ".js",
  ".json",
  ".jsonl",
  ".jsx",
  ".md",
  ".mjs",
  ".ps1",
  ".sh",
  ".sql",
  ".svg",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml"
]);
let lfsMediaDirectory = null;

function listRepoFiles(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listRepoFiles(abs, out);
      continue;
    }
    const rel = path.relative(repoRoot, abs).replace(/\\/g, "/");
    out.push(rel);
  }
  return out;
}

function getCandidateFiles() {
  const argFiles = process.argv.slice(2).map((f) => f.replace(/\\/g, "/")).filter(Boolean);
  if (argFiles.length > 0) return { files: argFiles, mode: "staged" };
  const stagedFromEnv = String(process.env.STAGED_FILES || "").trim();
  if (stagedFromEnv) {
    return {
      files: stagedFromEnv.split(/\r?\n/).map((f) => f.replace(/\\/g, "/")).filter(Boolean),
      mode: "staged"
    };
  }
  return { files: listRepoFiles(repoRoot), mode: "full" };
}

function isLikelyText(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 2048));
  for (const byte of sample) {
    if (byte === 0) return false;
  }
  return true;
}

const patterns = [
  { name: "Supabase service role key", regex: /sb_secret_[A-Za-z0-9_-]{10,}/g },
  { name: "OpenAI secret key", regex: /sk-(?:proj-)?[A-Za-z0-9]{20,}/g },
  { name: "GitHub token", regex: /(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/g },
  { name: "Google API key", regex: /AIza[0-9A-Za-z\-_]{20,}/g },
  { name: "Private key block", regex: /-----BEGIN [A-Z ]+PRIVATE KEY-----/g },
  {
    name: "Hardcoded provider key assignment (quoted)",
    regex: /\b(SUPABASE_SERVICE_ROLE_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY|GOOGLE_AI_API_KEY|ROBERT_PARKER_API_KEY)\b\s*[:=]\s*["'][^"']{8,}["']/g
  },
  {
    name: "Hardcoded provider key assignment (unquoted)",
    regex:
      /\b(SUPABASE_SERVICE_ROLE_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY|GOOGLE_AI_API_KEY|ROBERT_PARKER_API_KEY)\b\s*[:=]\s*[A-Za-z0-9_+=-]{8,}/g
  }
];

const allowedValueTokens = new Set([
  "YOUR_KEY_HERE",
  "<real-service-role-key>",
  "REPLACE_ME",
  "CHANGEME",
  "your_key_here",
  "replace_me",
  "YOUR_KEY"
]);

function isAllowedMatch(matchText) {
  for (const token of allowedValueTokens) {
    if (matchText.includes(token)) return true;
  }
  return false;
}

function runGit(args, options = {}) {
  return spawnSync("git", args, {
    cwd: repoRoot,
    encoding: options.encoding ?? null,
    maxBuffer: options.maxBuffer ?? maxScanBytes + 1024,
    windowsHide: true
  });
}

function isKnownTextPath(relFile) {
  const baseName = path.basename(relFile).toLowerCase();
  return baseName === ".env" || textExtensions.has(path.extname(baseName));
}

function readLocalFile(absFile, relFile) {
  if (!fs.existsSync(absFile)) return { raw: null };

  const stat = fs.statSync(absFile);
  if (!stat.isFile()) return { raw: null };

  const descriptor = fs.openSync(absFile, "r");
  const sample = Buffer.alloc(Math.min(stat.size, 2048));
  try {
    if (sample.length > 0) fs.readSync(descriptor, sample, 0, sample.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }

  if (!isLikelyText(sample)) return { raw: null };
  if (stat.size > maxScanBytes) {
    return {
      raw: null,
      error: `Text file exceeds the ${maxScanBytes / 1024 / 1024} MiB secret-scan limit; split it or extend the scanner.`
    };
  }

  return { raw: fs.readFileSync(absFile), relFile };
}

function getLfsMediaDirectory() {
  if (lfsMediaDirectory) return lfsMediaDirectory;

  const result = runGit(["lfs", "env"], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024
  });
  if (result.status !== 0) return null;

  const match = String(result.stdout).match(/^LocalMediaDir=(.+)$/m);
  if (!match) return null;
  lfsMediaDirectory = path.resolve(repoRoot, match[1].trim());
  return lfsMediaDirectory;
}

function resolveLfsPointer(raw, relFile) {
  const pointer = raw.toString("utf8");
  if (!pointer.startsWith(lfsPointerHeader)) return { raw };
  if (!isKnownTextPath(relFile)) return { raw: null };

  const oid = pointer.match(/^oid sha256:([a-f0-9]{64})$/m)?.[1];
  const declaredSize = Number.parseInt(pointer.match(/^size (\d+)$/m)?.[1] ?? "", 10);
  if (!oid || !Number.isFinite(declaredSize)) {
    return { raw: null, error: "Malformed Git LFS pointer." };
  }
  if (declaredSize > maxScanBytes) {
    return {
      raw: null,
      error: `Git LFS text object exceeds the ${maxScanBytes / 1024 / 1024} MiB secret-scan limit; split it or extend the scanner.`
    };
  }

  const mediaDirectory = getLfsMediaDirectory();
  if (!mediaDirectory) {
    return { raw: null, error: "Unable to locate the Git LFS object store." };
  }

  const objectPath = path.join(mediaDirectory, oid.slice(0, 2), oid.slice(2, 4), oid);
  if (!fs.existsSync(objectPath)) {
    return {
      raw: null,
      error: `Git LFS text object is not hydrated; run git lfs pull --include=${JSON.stringify(relFile)}.`
    };
  }

  const objectResult = readLocalFile(objectPath, relFile);
  if (objectResult.raw && objectResult.raw.length !== declaredSize) {
    return { raw: null, error: "Git LFS text object size does not match its staged pointer." };
  }
  return objectResult;
}

function readWorkingTreeFile(relFile) {
  const result = readLocalFile(path.join(repoRoot, relFile), relFile);
  return result.raw ? resolveLfsPointer(result.raw, relFile) : result;
}

function readStagedFile(relFile) {
  const indexPath = `:${relFile}`;
  const sizeResult = runGit(["cat-file", "-s", indexPath], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024
  });

  if (sizeResult.status !== 0) {
    return {
      raw: null,
      error: `Unable to read staged metadata: ${String(sizeResult.stderr ?? "").trim() || "git cat-file failed"}`
    };
  }

  const size = Number.parseInt(String(sizeResult.stdout).trim(), 10);
  if (!Number.isFinite(size)) {
    return { raw: null, error: "Unable to determine staged file size." };
  }
  if (size > maxGitBlobBytes) {
    return {
      raw: null,
      error: `Staged Git blob exceeds ${maxGitBlobBytes / 1024 / 1024} MiB; store large files with Git LFS.`
    };
  }

  const contentResult = runGit(["show", indexPath]);
  if (contentResult.status !== 0) {
    return {
      raw: null,
      error: `Unable to read staged content: ${String(contentResult.stderr ?? "").trim() || "git show failed"}`
    };
  }

  return resolveLfsPointer(contentResult.stdout, relFile);
}

function readCandidateFile(relFile, mode) {
  return mode === "staged" ? readStagedFile(relFile) : readWorkingTreeFile(relFile);
}

function checkSensitivePath(file, mode) {
  const normalized = file.replace(/\\/g, "/");
  if (mode === "staged" && normalized === ".env") return "Do not commit .env files.";
  if (mode === "staged" && /\.env\.(local|production|staging|dev|development)$/i.test(normalized)) {
    return "Do not commit environment secret files.";
  }
  return null;
}

function findLineNumber(text, idx) {
  return text.slice(0, idx).split(/\r?\n/).length;
}

function main() {
  const { files, mode } = getCandidateFiles();
  const findings = [];

  for (const relFile of files) {
    const pathFinding = checkSensitivePath(relFile, mode);
    if (pathFinding) {
      findings.push({ file: relFile, line: 1, name: pathFinding, sample: relFile });
      continue;
    }

    const { raw, error } = readCandidateFile(relFile, mode);
    if (error) {
      findings.push({ file: relFile, line: 1, name: "Secret guard read failure", sample: error });
      continue;
    }
    if (!raw) continue;
    if (!isLikelyText(raw)) continue;
    const text = raw.toString("utf8");

    for (const p of patterns) {
      p.regex.lastIndex = 0;
      let m;
      while ((m = p.regex.exec(text)) !== null) {
        const sample = m[0];
        if (isAllowedMatch(sample)) continue;
        findings.push({
          file: relFile,
          line: findLineNumber(text, m.index),
          name: p.name,
          sample: sample.length > 120 ? `${sample.slice(0, 117)}...` : sample
        });
      }
    }
  }

  if (findings.length === 0) {
    process.stdout.write("Secret guard: no issues found.\n");
    process.exit(0);
  }

  process.stderr.write("Secret guard blocked commit. Potential secrets found:\n");
  for (const f of findings) {
    process.stderr.write(`- ${f.file}:${f.line} [${f.name}] ${f.sample}\n`);
  }
  process.stderr.write("If this is a false positive, replace with a placeholder or move secret to local-secrets/.env.local.\n");
  process.exit(1);
}

main();
