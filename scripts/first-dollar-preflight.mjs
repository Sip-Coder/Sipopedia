import { execFileSync, spawn } from "node:child_process";
import process from "node:process";

const defaultBaseUrl = "https://sipopedia.com";
const remainingLiveProof = [
  "signed-in learner account starts Stripe Checkout from production",
  "Stripe returns to Sipopedia success with the full checkout session reference",
  "Stripe webhook writes billing_webhook_events and customer_subscriptions",
  "customer_subscriptions.metadata contains matching Stripe event, session, and subscription identifiers",
  "paid room opens from active or trialing subscription status without Admin override",
  "canceled or past-due subscription status does not keep paid access open"
];

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.FIRST_DOLLAR_BASE_URL ?? defaultBaseUrl,
    expectedCommit: process.env.FIRST_DOLLAR_EXPECTED_COMMIT ?? ""
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base-url") {
      options.baseUrl = argv[index + 1] ?? options.baseUrl;
      index += 1;
    } else if (arg === "--expected-commit") {
      options.expectedCommit = argv[index + 1] ?? options.expectedCommit;
      index += 1;
    }
  }

  options.baseUrl = options.baseUrl.replace(/\/+$/, "");
  return options;
}

function runNodeScript(scriptPath, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      stdio: "inherit",
      windowsHide: true
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${scriptPath} exited with code ${code ?? "unknown"}.`));
    });
  });
}

function localWorkingTreeSummary() {
  try {
    const status = execFileSync("git", ["status", "--porcelain"], {
      encoding: "utf8",
      windowsHide: true
    })
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const trackedChanges = status.filter((line) => !line.startsWith("?? "));
    return {
      trackedChanges: trackedChanges.length,
      untrackedChanges: status.length - trackedChanges.length
    };
  } catch {
    return null;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const probeArgs = ["--base-url", options.baseUrl];
  if (options.expectedCommit) {
    probeArgs.push("--expected-commit", options.expectedCommit);
  }

  console.log(`First-dollar preflight for ${options.baseUrl}`);
  const workingTree = localWorkingTreeSummary();
  if (workingTree && workingTree.trackedChanges > 0) {
    console.log(
      `Local working tree has ${workingTree.trackedChanges} tracked change${workingTree.trackedChanges === 1 ? "" : "s"} not in production yet; live checks may fail until the next RGRD publish.`
    );
  }
  await runNodeScript("scripts/first-dollar-production-probe.mjs", probeArgs);
  await runNodeScript("scripts/first-dollar-mobile-path-qa.mjs", ["--base-url", options.baseUrl]);

  console.log("Preflight passed. Remaining live proof before inviting a real customer:");
  for (const item of remainingLiveProof) {
    console.log(`- ${item}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
