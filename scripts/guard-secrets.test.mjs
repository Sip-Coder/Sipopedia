import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "guard-secrets.js");

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    env: options.env ?? process.env,
    windowsHide: true
  });
}

test("staged mode scans the Git index instead of an unstaged working-tree replacement", () => {
  const temporaryRepository = fs.mkdtempSync(path.join(os.tmpdir(), "sipopedia-secret-guard-"));

  try {
    const init = run("git", ["init", "--quiet"], { cwd: temporaryRepository });
    assert.equal(init.status, 0, init.stderr);

    const relativePath = "partial-stage.txt";
    const absolutePath = path.join(temporaryRepository, relativePath);
    const fakeSecret = ["sk", "proj", "thisisafakeregressiontestsecret"].join("-");
    fs.writeFileSync(absolutePath, `OPENAI_API_KEY=${fakeSecret}\n`);

    const add = run("git", ["add", "--", relativePath], { cwd: temporaryRepository });
    assert.equal(add.status, 0, add.stderr);

    fs.writeFileSync(absolutePath, "OPENAI_API_KEY=YOUR_KEY_HERE\n");

    const guard = run(process.execPath, [scriptPath], {
      cwd: temporaryRepository,
      env: {
        ...process.env,
        STAGED_FILES: relativePath
      }
    });

    assert.equal(guard.status, 1, guard.stdout || guard.stderr);
    assert.match(guard.stderr, /OpenAI secret key|Hardcoded provider key assignment/);
    assert.match(guard.stderr, /partial-stage\.txt/);
  } finally {
    fs.rmSync(temporaryRepository, { recursive: true, force: true });
  }
});

test("full mode scans text files larger than the former 8 MiB limit", () => {
  const temporaryRepository = fs.mkdtempSync(path.join(os.tmpdir(), "sipopedia-secret-guard-large-"));

  try {
    const largePath = path.join(temporaryRepository, "large-export.sql");
    const fakeSecret = ["sk", "proj", "largefileregressiontestsecret"].join("-");
    fs.writeFileSync(largePath, `${"-- safe filler\n".repeat(700_000)}OPENAI_API_KEY=${fakeSecret}\n`);

    const guard = run(process.execPath, [scriptPath], { cwd: temporaryRepository });
    assert.equal(guard.status, 1, guard.stdout || guard.stderr);
    assert.match(guard.stderr, /large-export\.sql/);
  } finally {
    fs.rmSync(temporaryRepository, { recursive: true, force: true });
  }
});

test("staged mode resolves and scans Git LFS text objects", () => {
  const temporaryRepository = fs.mkdtempSync(path.join(os.tmpdir(), "sipopedia-secret-guard-lfs-"));

  try {
    const init = run("git", ["init", "--quiet"], { cwd: temporaryRepository });
    assert.equal(init.status, 0, init.stderr);

    const relativePath = "terms.jsonl";
    const fakeSecret = ["sk", "proj", "lfsregressiontestsecretvalue"].join("-");
    const payload = Buffer.from(`{"api_key":"${fakeSecret}"}\n`);
    const oid = crypto.createHash("sha256").update(payload).digest("hex");
    const pointer = [
      "version https://git-lfs.github.com/spec/v1",
      `oid sha256:${oid}`,
      `size ${payload.length}`,
      ""
    ].join("\n");

    const absolutePath = path.join(temporaryRepository, relativePath);
    fs.writeFileSync(absolutePath, pointer);
    const add = run("git", ["add", "--", relativePath], { cwd: temporaryRepository });
    assert.equal(add.status, 0, add.stderr);
    fs.writeFileSync(absolutePath, "{}\n");

    const objectDirectory = path.join(temporaryRepository, ".git", "lfs", "objects", oid.slice(0, 2), oid.slice(2, 4));
    fs.mkdirSync(objectDirectory, { recursive: true });
    fs.writeFileSync(path.join(objectDirectory, oid), payload);

    const guard = run(process.execPath, [scriptPath], {
      cwd: temporaryRepository,
      env: {
        ...process.env,
        STAGED_FILES: relativePath
      }
    });

    assert.equal(guard.status, 1, guard.stdout || guard.stderr);
    assert.match(guard.stderr, /OpenAI secret key/);
    assert.match(guard.stderr, /terms\.jsonl/);
  } finally {
    fs.rmSync(temporaryRepository, { recursive: true, force: true });
  }
});

test("staged mode rejects large non-LFS Git blobs", () => {
  const temporaryRepository = fs.mkdtempSync(path.join(os.tmpdir(), "sipopedia-secret-guard-blob-"));

  try {
    const init = run("git", ["init", "--quiet"], { cwd: temporaryRepository });
    assert.equal(init.status, 0, init.stderr);

    const relativePath = "oversized.bin";
    fs.writeFileSync(path.join(temporaryRepository, relativePath), Buffer.alloc(11 * 1024 * 1024, 0xa5));
    const add = run("git", ["add", "--", relativePath], { cwd: temporaryRepository });
    assert.equal(add.status, 0, add.stderr);

    const guard = run(process.execPath, [scriptPath], {
      cwd: temporaryRepository,
      env: {
        ...process.env,
        STAGED_FILES: relativePath
      }
    });

    assert.equal(guard.status, 1, guard.stdout || guard.stderr);
    assert.match(guard.stderr, /Staged Git blob exceeds 10 MiB/);
    assert.match(guard.stderr, /oversized\.bin/);
  } finally {
    fs.rmSync(temporaryRepository, { recursive: true, force: true });
  }
});
