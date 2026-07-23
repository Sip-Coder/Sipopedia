import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const lfsPointerHeader = "version https://git-lfs.github.com/spec/v1";
const maximumPointerBytes = 1024;

async function inspectPath(targetPath, pointers) {
  const targetStats = await lstat(targetPath);

  if (targetStats.isSymbolicLink()) {
    return;
  }

  if (targetStats.isDirectory()) {
    const entries = await readdir(targetPath, { withFileTypes: true });
    for (const entry of entries) {
      await inspectPath(path.join(targetPath, entry.name), pointers);
    }
    return;
  }

  if (!targetStats.isFile() || targetStats.size > maximumPointerBytes) {
    return;
  }

  const content = await readFile(targetPath, "utf8");
  if (content.startsWith(lfsPointerHeader)) {
    pointers.push(targetPath);
  }
}

export async function findLfsPointers(targetPaths) {
  const pointers = [];
  for (const targetPath of targetPaths) {
    await inspectPath(path.resolve(targetPath), pointers);
  }
  return pointers;
}

export async function assertNoLfsPointers(targetPaths, options = {}) {
  const pointers = await findLfsPointers(targetPaths);
  const displayRoot = options.displayRoot ?? process.cwd();

  if (pointers.length > 0) {
    const displayed = pointers
      .slice(0, 20)
      .map((pointerPath) => `- ${path.relative(displayRoot, pointerPath)}`)
      .join("\n");
    const remainder = pointers.length > 20 ? `\n- ...and ${pointers.length - 20} more` : "";
    throw new Error(
      `Refusing to continue: ${pointers.length} Git LFS pointer file(s) remain in deployment output:\n${displayed}${remainder}`
    );
  }

  console.log(`Git LFS pointer guard passed for ${targetPaths.length} deployment target(s).`);
}

function normalizedExecutablePath(candidate) {
  const normalized = path.normalize(path.resolve(candidate));
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

const invokedPath = process.argv[1] ? normalizedExecutablePath(process.argv[1]) : null;
const modulePath = normalizedExecutablePath(fileURLToPath(import.meta.url));

if (invokedPath === modulePath) {
  const targetPaths = process.argv.slice(2);
  if (targetPaths.length === 0) {
    console.error("Usage: node scripts/lfs-pointer-guard.mjs <file-or-directory> [...]");
    process.exit(2);
  }

  assertNoLfsPointers(targetPaths).catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
