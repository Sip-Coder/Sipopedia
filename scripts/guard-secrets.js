#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function listRepoFiles(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "dist") continue;
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
  { name: "OpenAI secret key", regex: /sk-[A-Za-z0-9]{20,}/g },
  { name: "GitHub token", regex: /(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/g },
  { name: "Google API key", regex: /AIza[0-9A-Za-z\-_]{20,}/g },
  { name: "Private key block", regex: /-----BEGIN [A-Z ]+PRIVATE KEY-----/g },
  {
    name: "Hardcoded provider key assignment",
    regex: /\b(SUPABASE_SERVICE_ROLE_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY|GOOGLE_AI_API_KEY|ROBERT_PARKER_API_KEY)\b\s*[:=]\s*["'][^"']{8,}["']/g
  }
];

const allowedValueTokens = new Set([
  "YOUR_KEY_HERE",
  "<real-service-role-key>",
  "REPLACE_ME",
  "CHANGEME"
]);

function isAllowedMatch(matchText) {
  for (const token of allowedValueTokens) {
    if (matchText.includes(token)) return true;
  }
  return false;
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

    const absFile = path.join(repoRoot, relFile);
    if (!fs.existsSync(absFile)) continue;
    const raw = fs.readFileSync(absFile);
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
