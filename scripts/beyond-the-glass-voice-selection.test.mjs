import assert from "node:assert/strict";
import test from "node:test";
import {
  selectBeyondTheGlassVoices
} from "../src/features/beyond-the-glass/voiceSelection.ts";

function voice(name, lang, options = {}) {
  return {
    default: options.default ?? false,
    lang,
    localService: options.localService ?? true,
    name,
    voiceURI: options.voiceURI ?? `${lang}:${name}`
  };
}

test("selects distinct accent-specific natural voices when installed", () => {
  const selected = selectBeyondTheGlassVoices([
    voice("Microsoft Ryan Online (Natural)", "en-GB"),
    voice("Fiona", "en-GB"),
    voice("Microsoft Connor Online (Natural)", "en-IE")
  ]);

  assert.equal(selected.Sippy?.name, "Microsoft Ryan Online (Natural)");
  assert.equal(selected.Roma?.name, "Fiona");
  assert.equal(selected.Hummin?.name, "Microsoft Connor Online (Natural)");
});

test("uses graceful UK fallbacks without reusing a voice unnecessarily", () => {
  const selected = selectBeyondTheGlassVoices([
    voice("Microsoft Ryan Online (Natural)", "en-GB"),
    voice("Daniel", "en-GB"),
    voice("Microsoft Sonia Online (Natural)", "en-GB")
  ]);

  assert.equal(selected.Roma?.name, "Microsoft Sonia Online (Natural)");
  assert.equal(selected.Hummin?.name, "Microsoft Ryan Online (Natural)");
  assert.equal(selected.Sippy?.name, "Daniel");
});

test("reuses the only English voice and ignores non-English-only lists", () => {
  const onlyEnglish = voice("Google UK English Male", "en-GB");
  const reused = selectBeyondTheGlassVoices([onlyEnglish]);

  assert.equal(reused.Sippy?.voiceURI, onlyEnglish.voiceURI);
  assert.equal(reused.Roma?.voiceURI, onlyEnglish.voiceURI);
  assert.equal(reused.Hummin?.voiceURI, onlyEnglish.voiceURI);

  const unavailable = selectBeyondTheGlassVoices([
    voice("Microsoft Hortense", "fr-FR")
  ]);
  assert.equal(unavailable.Sippy, null);
  assert.equal(unavailable.Roma, null);
  assert.equal(unavailable.Hummin, null);
});
