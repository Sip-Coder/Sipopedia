import { useState } from "react";
import { askAi, type AiProvider } from "../lib/aiRouter";
import { useAuth } from "../context/AuthContext";

const starterPrompt =
  "Explain AI like I am 10 years old. Use 5 short bullet points and one real life example.";

export function AiLab() {
  const { isConfigured, user } = useAuth();
  const [provider, setProvider] = useState<AiProvider>("openai");
  const [prompt, setPrompt] = useState(starterPrompt);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const canRun = isConfigured && Boolean(user);

  const runPrompt = async () => {
    setBusy(true);
    setError("");

    try {
      const data = await askAi({ provider, prompt });
      setReply(`[${data.provider} / ${data.model}]\n\n${data.text}`);
    } catch (runError: unknown) {
      setError(runError instanceof Error ? runError.message : "Something went wrong.");
      setReply("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="lab">
      <div className="section-header">
        <h2>Safe AI test box</h2>
        <p>Your request is handled securely, and service credentials stay protected.</p>
      </div>

      <div className="lab-grid">
        <div className="lab-controls">
          <label htmlFor="provider">Choose AI provider</label>
          <select id="provider" value={provider} onChange={(event) => setProvider(event.target.value as AiProvider)}>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google</option>
          </select>

          <label htmlFor="prompt">Ask something</label>
          <textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={7} />

          <button className="btn btn-primary" disabled={busy || !canRun} onClick={runPrompt}>
            {busy ? "Thinking..." : "Send safely"}
          </button>

          {!isConfigured ? <p className="hint">AI tools are temporarily unavailable. Please try again later.</p> : null}
          {isConfigured && !user ? <p className="hint">Sign in to use the AI router securely.</p> : null}
          {error ? <p className="error">{error}</p> : null}
        </div>

        <div className="lab-output">
          <h3>AI answer</h3>
          <pre>{reply || "No answer yet. Press Send safely."}</pre>
        </div>
      </div>
    </section>
  );
}
