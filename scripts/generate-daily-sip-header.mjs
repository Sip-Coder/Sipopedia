import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();
const DATA_PATH = path.join(REPO_ROOT, "src", "data", "dailySip.ts");
const DEFAULT_IMAGE_MODEL = process.env.DAILY_SIP_IMAGE_MODEL || "gpt-image-2";

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadLatestReport() {
  const source = await readFile(DATA_PATH, "utf8");
  const reportsMatch = /export const dailySipReports: DailySipReport\[\] = ([\s\S]*?);\s*(?:export const dailySipReport|$)/.exec(source);
  if (!reportsMatch?.[1]) {
    throw new Error("dailySipReports export was not found.");
  }
  const reports = JSON.parse(reportsMatch[1]);
  if (!Array.isArray(reports) || !reports[0]) {
    throw new Error("dailySipReports is empty.");
  }
  return reports[0];
}

function publicUrlToPath(publicUrl) {
  if (!publicUrl?.startsWith("/")) {
    throw new Error(`Expected a site-root image URL, got ${publicUrl || "empty"}.`);
  }
  return path.join(REPO_ROOT, "public", publicUrl.replace(/^\/+/, ""));
}

async function writeImageFromResponse(image, outPath) {
  await mkdir(path.dirname(outPath), { recursive: true });

  if (image.b64_json) {
    await writeFile(outPath, Buffer.from(image.b64_json, "base64"));
    return;
  }

  if (image.url) {
    const response = await fetch(image.url);
    if (!response.ok) {
      throw new Error(`Could not download generated image: ${response.status} ${response.statusText}`);
    }
    await writeFile(outPath, Buffer.from(await response.arrayBuffer()));
    return;
  }

  throw new Error("Image generation response did not include image data.");
}

async function main() {
  const report = await loadLatestReport();
  const outPath = publicUrlToPath(report.headerImageUrl);

  if (await fileExists(outPath)) {
    console.log(`Daily Sip header already exists: ${outPath}`);
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY is not set; handing off to Codex image fallback if available.");
    console.log(`Prompt saved in src/data/dailySip.ts for ${report.id}.`);
    process.exit(2);
  }

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI();
  const result = await client.images.generate({
    model: DEFAULT_IMAGE_MODEL,
    prompt: report.headerImagePrompt,
    size: "1536x1024",
    quality: "medium"
  });

  const image = result.data?.[0];
  if (!image) {
    throw new Error("Image generation returned no images.");
  }

  await writeImageFromResponse(image, outPath);
  console.log(`Daily Sip header generated: ${outPath}`);
}

main().catch((error) => {
  console.error(`generate-daily-sip-header failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
