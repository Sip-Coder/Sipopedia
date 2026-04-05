import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function parseArgs(argv) {
  const getValue = (flag, fallback = null) => {
    const idx = argv.lastIndexOf(flag);
    if (idx >= 0 && argv[idx + 1]) return argv[idx + 1];
    return fallback;
  };

  return {
    limit: Number(getValue("--limit", "2000")),
    term: getValue("--term", ""),
    quality: String(getValue("--quality", "low")).toLowerCase(),
    size: String(getValue("--size", "1024x1024")).toLowerCase(),
    concurrency: Number(getValue("--concurrency", "3")),
    throttleMs: Number(getValue("--throttle-ms", "12500")),
    maxRetries: Number(getValue("--max-retries", "8")),
    dryRun: argv.includes("--dry-run")
  };
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function buildPrompt(entry) {
  const paletteCycle = [
    { bg: "#d8e6da", primary: "#185552", accent: "#8b4513", name: "Sky Blue + Racing Green" },
    { bg: "#edd4a8", primary: "#185552", accent: "#817985", name: "Cream + Racing Green" },
    { bg: "#e9dfec", primary: "#185552", accent: "#8b4513", name: "Lavender Tint + Racing Green" },
    { bg: "#dcebe7", primary: "#8b4513", accent: "#185552", name: "Green Tint + Chestnut" },
    { bg: "#f2e2c3", primary: "#817985", accent: "#185552", name: "Cream Tint + Lavender" }
  ];
  const palette = paletteCycle[Math.abs(entry.__paletteIndex ?? 0) % paletteCycle.length];
  const conciseMeaning = String(entry.meaning || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);

  return [
    "Create a clean educational infographic illustration in a simple line-art vector-like style.",
    `Use this exact company palette mode: ${palette.name}.`,
    `Background color: ${palette.bg}. Primary stroke/text color: ${palette.primary}. Accent color: ${palette.accent}.`,
    "Layout: left side has a symbolic illustration, right side has term title, phonetic subtitle, and concise definition text block.",
    "CRITICAL LAYOUT RULES:",
    "- Keep ALL artwork and ALL text fully inside the canvas.",
    "- Leave at least 8% padding on every edge.",
    "- Use a safe area centered in the canvas; no clipping at left or right edges.",
    "- If title or definition is long, reduce font size and wrap earlier so nothing is truncated.",
    "- Keep definition to 4 lines max.",
    "- Do not let any character touch or cross the image boundary.",
    "Do not include logos or copyrighted brand assets.",
    "No photorealism. No clutter. High readability.",
    `Topic term: ${entry.term}.`,
    `Meaning to convey (concise): ${conciseMeaning}`,
    `Application angle: ${entry.how_to_apply}`
  ].join(" ");
}

async function fetchCandidates({ supabaseUrl, serviceKey, limit, term }) {
  const params = new URLSearchParams();
  params.set("select", "id,term,meaning,how_to_apply");
  params.set("is_published", "eq.true");
  params.set("order", "updated_at.asc");
  params.set("limit", String(Math.max(1, Math.min(limit, 5000))));
  if (term) {
    params.set("term", `ilike.*${term}*`);
  } else {
    params.set("infographic_url", "is.null");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/terminology_entries?${params.toString()}`, {
    method: "GET",
    headers: {
      apikey: serviceKey
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch terminology candidates (${response.status}).`);
  }
  const rows = await response.json();
  return rows.map((row, index) => ({ ...row, __paletteIndex: index }));
}

async function generateImageB64({ openAiKey, prompt, quality, size }) {
  const requestBody = {
    model: "gpt-image-1",
    prompt,
    size
  };
  if (["low", "medium", "high", "auto"].includes(quality)) {
    requestBody.quality = quality;
  }

  let response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok && requestBody.quality) {
    const errorBody = await response.text();
    if (errorBody.toLowerCase().includes("unknown parameter") && errorBody.toLowerCase().includes("quality")) {
      response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          size
        })
      });
    } else {
      throw new Error(`OpenAI image generation failed (${response.status}): ${errorBody}`);
    }
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI image generation failed (${response.status}): ${text}`);
  }
  const payload = await response.json();
  const first = payload?.data?.[0] ?? {};
  const b64 = first.b64_json;
  if (typeof b64 === "string" && b64.length > 0) {
    return b64;
  }
  if (typeof first.url === "string" && first.url.length > 0) {
    const imageRes = await fetch(first.url);
    if (!imageRes.ok) {
      throw new Error(`Image URL fetch failed (${imageRes.status}).`);
    }
    const arrayBuffer = await imageRes.arrayBuffer();
    return Buffer.from(arrayBuffer).toString("base64");
  }
  if (!b64) throw new Error("OpenAI response missing image data.");
  return b64;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryMs(message, fallbackMs = 12000) {
  const text = String(message || "");
  const secMatch = text.match(/try again in\s+(\d+)s/i);
  if (secMatch) return (Number(secMatch[1]) + 1) * 1000;
  return fallbackMs;
}

async function updateInfographicFields({ supabaseUrl, serviceKey, id, urlPath, caption }) {
  const response = await fetch(`${supabaseUrl}/rest/v1/terminology_entries?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      infographic_url: urlPath,
      infographic_caption: caption
    })
  });
  if (!response.ok) {
    throw new Error(`Failed to update infographic fields (${response.status}).`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const openAiKey = args.dryRun ? "" : requireEnv("OPENAI_API_KEY");
  const outDir = path.join(process.cwd(), "public", "infographics", "regeneration");

  fs.mkdirSync(outDir, { recursive: true });
  const candidates = await fetchCandidates({
    supabaseUrl,
    serviceKey,
    limit: Number.isFinite(args.limit) ? args.limit : 8,
    term: args.term
  });

  if (!Array.isArray(candidates) || candidates.length === 0) {
    console.log("No terminology entries matched infographic generation filters.");
    return;
  }

  const pricingHintByQuality = {
    low: 0.009,
    medium: 0.034,
    high: 0.133
  };
  const estimatedPerImage = pricingHintByQuality[args.quality] ?? pricingHintByQuality.low;
  const estimatedTotal = Number((candidates.length * estimatedPerImage).toFixed(2));
  console.log(
    JSON.stringify(
      {
        mode: args.dryRun ? "dry-run" : "live",
        quality: args.quality,
        size: args.size,
        concurrency: args.concurrency,
        candidates: candidates.length,
        estimated_cost_usd: estimatedTotal
      },
      null,
      2
    )
  );

  let generated = 0;
  let failed = 0;
  const safeConcurrency = Math.max(1, Math.min(Number.isFinite(args.concurrency) ? args.concurrency : 3, 10));
  const throttleMs = Math.max(0, Number.isFinite(args.throttleMs) ? args.throttleMs : 12500);
  const maxRetries = Math.max(0, Number.isFinite(args.maxRetries) ? args.maxRetries : 8);

  if (args.dryRun) {
    for (const entry of candidates) {
      const slug = slugify(entry.term);
      const filename = `${slug || entry.id}.png`;
      const relativeUrl = `/infographics/regeneration/${filename}`;
      console.log(`[dry-run] ${entry.term} -> ${relativeUrl}`);
    }
  } else {
    let cursor = 0;
    let nextStartAt = 0;
    async function acquireSlot() {
      const now = Date.now();
      const waitMs = Math.max(0, nextStartAt - now);
      nextStartAt = Math.max(now, nextStartAt) + throttleMs;
      if (waitMs > 0) {
        await sleep(waitMs);
      }
    }
    async function worker() {
      while (true) {
        const index = cursor;
        cursor += 1;
        if (index >= candidates.length) return;
        const entry = candidates[index];
        try {
          const slug = slugify(entry.term);
          const filename = `${slug || entry.id}.png`;
          const relativeUrl = `/infographics/regeneration/${filename}`;
          const absolutePath = path.join(outDir, filename);
          const prompt = buildPrompt(entry);

          let b64 = "";
          let attempts = 0;
          while (attempts <= maxRetries) {
            attempts += 1;
            try {
              await acquireSlot();
              b64 = await generateImageB64({
                openAiKey,
                prompt,
                quality: args.quality,
                size: args.size
              });
              break;
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              if (message.includes("(429)") || message.toLowerCase().includes("rate limit")) {
                const retryMs = parseRetryMs(message, throttleMs);
                await sleep(retryMs);
                continue;
              }
              throw error;
            }
          }
          if (!b64) {
            throw new Error("Image generation retries exhausted.");
          }
          fs.writeFileSync(absolutePath, Buffer.from(b64, "base64"));
          await updateInfographicFields({
            supabaseUrl,
            serviceKey,
            id: entry.id,
            urlPath: relativeUrl,
            caption: `Educational infographic for ${entry.term}.`
          });

          generated += 1;
          if (generated <= 10 || generated % 25 === 0 || generated === candidates.length) {
            console.log(`Generated infographic (${index + 1}/${candidates.length}): ${entry.term} -> ${relativeUrl}`);
          }
        } catch (error) {
          failed += 1;
          const message = error instanceof Error ? error.message : "Unknown error";
          if (failed <= 10 || failed % 25 === 0) {
            console.error(`Failed infographic (${index + 1}/${candidates.length}) for ${entry.term}: ${message}`);
          }
        }
      }
    }

    await Promise.all(Array.from({ length: safeConcurrency }, () => worker()));
  }

  console.log(
    JSON.stringify(
      {
        candidates: candidates.length,
        generated,
        failed
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(`generate-term-infographics failed: ${error.message}`);
  process.exit(1);
});
