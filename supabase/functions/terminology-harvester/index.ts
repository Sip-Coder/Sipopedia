const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json(405, { error: "Use POST only." });
  }

  return json(410, {
    ok: false,
    error: "Legacy terminology-harvester pipeline is deprecated.",
    next_step:
      "Use the conversation-driven Start Terms workflow (npm run terms:audit, npm run terms:start -- --dry-run, npm run terms:start).",
    policy: "Encyclopedia and dictionary sources are blocked in the new pipeline."
  });
});
