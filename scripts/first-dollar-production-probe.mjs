import { execFileSync } from "node:child_process";
import process from "node:process";

const defaultBaseUrl = "https://sipopedia.com";
const expectedRepository = "Sip-Coder/Sipopedia";

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.FIRST_DOLLAR_BASE_URL ?? defaultBaseUrl,
    expectedCommit: process.env.FIRST_DOLLAR_EXPECTED_COMMIT ?? "",
    supabaseUrl: process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "",
    anonKey: process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "",
    json: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base-url") {
      options.baseUrl = argv[index + 1] ?? options.baseUrl;
      index += 1;
    } else if (arg === "--expected-commit") {
      options.expectedCommit = argv[index + 1] ?? options.expectedCommit;
      index += 1;
    } else if (arg === "--supabase-url") {
      options.supabaseUrl = argv[index + 1] ?? options.supabaseUrl;
      index += 1;
    } else if (arg === "--anon-key") {
      options.anonKey = argv[index + 1] ?? options.anonKey;
      index += 1;
    } else if (arg === "--json") {
      options.json = true;
    }
  }

  options.baseUrl = options.baseUrl.replace(/\/+$/, "");
  return options;
}

function currentGitCommit() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
      windowsHide: true
    }).trim();
  } catch {
    return "";
  }
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    redirect: "follow",
    cache: "no-store",
    ...options,
    headers: {
      "User-Agent": "Sipopedia first-dollar production probe",
      ...(options.headers ?? {})
    }
  });
  const body = await response.text();
  return { response, body };
}

async function fetchJson(url, options = {}) {
  const result = await fetchText(url, options);
  let json = null;
  try {
    json = JSON.parse(result.body);
  } catch {
    // Keep the raw body available for diagnostics below.
  }
  return { ...result, json };
}

function result(name, status, detail, evidence = {}) {
  return { name, status, detail, evidence };
}

function statusIcon(status) {
  if (status === "pass") return "PASS";
  if (status === "warn") return "WARN";
  return "FAIL";
}

function redacted(value) {
  if (!value) return "";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

async function discoverPublicSupabaseConfig(baseUrl, html) {
  const scriptSources = Array.from(html.matchAll(/<script[^>]+src="([^"]+\.js)"[^>]*>/gi)).map((match) => match[1]);
  const prioritizedSources = [
    ...scriptSources.filter((source) => /\/assets\/index-[^/]+\.js$/i.test(source)),
    ...scriptSources.filter((source) => !/\/assets\/index-[^/]+\.js$/i.test(source))
  ];

  for (const source of prioritizedSources.slice(0, 8)) {
    const url = new URL(source, `${baseUrl}/`).toString();
    const { response, body } = await fetchText(url);
    if (!response.ok) continue;
    const supabaseUrl = body.match(/https:\/\/[a-z0-9.-]+\.supabase\.co/i)?.[0] ?? "";
    const publishableKey = body.match(/sb_publishable_[A-Za-z0-9_-]+/)?.[0] ?? "";
    const legacyAnonKey = body.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/)?.[0] ?? "";
    if (supabaseUrl && (publishableKey || legacyAnonKey)) {
      return {
        supabaseUrl,
        anonKey: publishableKey || legacyAnonKey,
        source: url
      };
    }
  }

  return { supabaseUrl: "", anonKey: "", source: "" };
}

async function probeCheckoutFunction({ baseUrl, supabaseUrl, anonKey }) {
  const endpoint = `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/create-checkout-session`;
  const { response, body, json } = await fetchJson(endpoint, {
    method: "POST",
    headers: {
      apikey: anonKey,
      authorization: `Bearer ${anonKey}`,
      "content-type": "application/json",
      origin: baseUrl
    },
    body: JSON.stringify({ planId: "pro", source: "first-dollar-probe", next: "app/launch" })
  });
  const message = typeof json?.error === "string" ? json.error : body.slice(0, 180);
  const expectedGuard = response.status === 401 && /sign in is required/i.test(message);
  return result(
    "checkout function guard",
    expectedGuard ? "pass" : "fail",
    expectedGuard
      ? "Checkout Edge Function is reachable and refuses to create Stripe checkout before login."
      : `Expected a safe 401 login guard, got HTTP ${response.status}.`,
    { httpStatus: response.status, message }
  );
}

async function probeBillingWebhook({ baseUrl, supabaseUrl, anonKey }) {
  const endpoint = `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/billing-webhook`;
  const { response, body, json } = await fetchJson(endpoint, {
    method: "POST",
    headers: {
      apikey: anonKey,
      "content-type": "application/json",
      origin: baseUrl
    },
    body: JSON.stringify({ probe: true })
  });
  const message = typeof json?.error === "string" ? json.error : body.slice(0, 180);
  const expectedGuard = response.status === 401 && /unauthorized/i.test(message);
  return result(
    "billing webhook guard",
    expectedGuard ? "pass" : "fail",
    expectedGuard
      ? "Billing webhook is reachable and rejects unsigned calls."
      : `Expected a safe 401 unsigned-webhook guard, got HTTP ${response.status}.`,
    { httpStatus: response.status, message }
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const expectedCommit = options.expectedCommit || currentGitCommit();
  const checks = [];

  const manifestUrl = `${options.baseUrl}/rgrd.json?probe=${Date.now()}`;
  const manifestResult = await fetchJson(manifestUrl);
  if (!manifestResult.response.ok || !manifestResult.json) {
    checks.push(result("live RGRD manifest", "fail", `Could not read ${manifestUrl}.`, { httpStatus: manifestResult.response.status }));
  } else {
    const manifest = manifestResult.json;
    const commitMatches = manifest.commit === expectedCommit;
    const repositoryMatches = manifest.repository === expectedRepository;
    checks.push(result(
      "live RGRD manifest",
      commitMatches && repositoryMatches ? "pass" : "fail",
      commitMatches && repositoryMatches
        ? `Production serves ${manifest.repository}@${manifest.commit.slice(0, 12)}.`
        : "Production manifest does not match the expected GitHub commit or repository.",
      {
        repository: manifest.repository,
        commit: manifest.commit,
        expectedCommit,
        provider: manifest.provider,
        builtAt: manifest.builtAt
      }
    ));
  }

  const homeResult = await fetchText(`${options.baseUrl}/?probe=${Date.now()}`);
  const hasRoot = homeResult.body.includes('id="root"');
  const hasAssets = /<script[^>]+src="[^"]+\.js"/i.test(homeResult.body);
  checks.push(result(
    "homepage app shell",
    homeResult.response.ok && hasRoot && hasAssets ? "pass" : "fail",
    homeResult.response.ok && hasRoot && hasAssets
      ? "Production homepage returns the React app shell and assets."
      : `Homepage shell looked incomplete at HTTP ${homeResult.response.status}.`,
    { httpStatus: homeResult.response.status, hasRoot, hasAssets }
  ));

  let supabaseUrl = options.supabaseUrl.trim();
  let anonKey = options.anonKey.trim();
  let configSource = supabaseUrl && anonKey ? "environment" : "";
  if (!supabaseUrl || !anonKey) {
    const discovered = await discoverPublicSupabaseConfig(options.baseUrl, homeResult.body);
    supabaseUrl = supabaseUrl || discovered.supabaseUrl;
    anonKey = anonKey || discovered.anonKey;
    configSource = discovered.source ? "production bundle" : configSource;
  }

  if (!supabaseUrl || !anonKey) {
    checks.push(result(
      "public Supabase config",
      "warn",
      "Public Supabase URL/key were not found, so Edge Function reachability was not probed.",
      {}
    ));
  } else {
    checks.push(result(
      "public Supabase config",
      "pass",
      `Public Supabase config found from ${configSource}.`,
      { supabaseUrl, anonKey: redacted(anonKey), source: configSource }
    ));
    checks.push(await probeCheckoutFunction({ baseUrl: options.baseUrl, supabaseUrl, anonKey }));
    checks.push(await probeBillingWebhook({ baseUrl: options.baseUrl, supabaseUrl, anonKey }));
  }

  const failed = checks.filter((check) => check.status === "fail");
  const warned = checks.filter((check) => check.status === "warn");
  const payload = {
    baseUrl: options.baseUrl,
    expectedCommit,
    generatedAt: new Date().toISOString(),
    summary: {
      passed: checks.filter((check) => check.status === "pass").length,
      warned: warned.length,
      failed: failed.length
    },
    checks
  };

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log(`First-dollar production probe for ${options.baseUrl}`);
    console.log(`Expected commit: ${expectedCommit || "unknown"}`);
    for (const check of checks) {
      console.log(`[${statusIcon(check.status)}] ${check.name}: ${check.detail}`);
    }
  }

  if (failed.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
