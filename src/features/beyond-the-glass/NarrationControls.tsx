import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  BeyondTheGlassNarrationLine,
  BeyondTheGlassScene
} from "../../data/beyondTheGlassChapters";
import {
  emptySpeakerVoiceMap,
  selectBeyondTheGlassVoices,
  SPEAKER_SETTINGS,
  type SpeakerVoiceMap
} from "./voiceSelection";

type NarrationStatus = "idle" | "playing" | "paused";

type NarrationControlsProps = {
  captionsVisible: boolean;
  onActiveLineChange?: (lineIndex: number | null) => void;
  onCaptionsChange: (visible: boolean) => void;
  onSceneRequest: (index: number) => void;
  onTranscriptRequest: () => void;
  scene: BeyondTheGlassScene;
  sceneCount: number;
  sceneIndex: number;
};

function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function waitForVoicesReady(timeoutMs = 1400): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!speechSupported()) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;
    const immediateVoices = synth.getVoices();
    if (immediateVoices.length > 0) {
      resolve(immediateVoices);
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      synth.removeEventListener("voiceschanged", handleVoicesChanged);
      window.clearTimeout(timer);
      resolve(synth.getVoices());
    };
    const handleVoicesChanged = () => finish();
    const timer = window.setTimeout(finish, timeoutMs);
    synth.addEventListener("voiceschanged", handleVoicesChanged);
  });
}

export function NarrationControls({
  captionsVisible,
  onActiveLineChange,
  onCaptionsChange,
  onSceneRequest,
  onTranscriptRequest,
  scene,
  sceneCount,
  sceneIndex
}: NarrationControlsProps) {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState<NarrationStatus>("idle");
  const resumeAfterMuteRef = useRef(false);
  const runTokenRef = useRef(0);
  const statusRef = useRef<NarrationStatus>("idle");
  const sceneIdRef = useRef(scene.id);
  const speakerVoicesRef = useRef<SpeakerVoiceMap>(emptySpeakerVoiceMap());
  const supported = useMemo(speechSupported, []);

  const setNarrationStatus = useCallback((next: NarrationStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const cancelSpeech = useCallback(() => {
    runTokenRef.current += 1;
    if (supported) window.speechSynthesis.cancel();
    resumeAfterMuteRef.current = false;
    setActiveLineIndex(0);
    setNarrationStatus("idle");
  }, [setNarrationStatus, supported]);

  const speakScene = useCallback(
    (startIndex = 0) => {
      if (!supported || muted || scene.narration.length === 0) return;
      runTokenRef.current += 1;
      const runToken = runTokenRef.current;
      window.speechSynthesis.cancel();
      sceneIdRef.current = scene.id;
      setNarrationStatus("playing");

      void waitForVoicesReady().then((availableVoices) => {
        if (runTokenRef.current !== runToken) return;
        if (availableVoices.length > 0) {
          // Browser voices are device-dependent. These profiles deliberately
          // choose the closest installed option and fall back gracefully.
          speakerVoicesRef.current = selectBeyondTheGlassVoices(availableVoices);
        }

        const speakLine = (lineIndex: number) => {
          if (runTokenRef.current !== runToken) return;
          if (sceneIdRef.current !== scene.id || statusRef.current === "idle") return;
          const line: BeyondTheGlassNarrationLine | undefined = scene.narration[lineIndex];
          if (!line) {
            setNarrationStatus("idle");
            setActiveLineIndex(0);
            return;
          }

          setActiveLineIndex(lineIndex);
          const utterance = new SpeechSynthesisUtterance(line.text);
          const settings = SPEAKER_SETTINGS[line.speaker];
          const voice = speakerVoicesRef.current[line.speaker];
          if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
          } else {
            utterance.lang = settings.fallbackLang;
          }
          utterance.pitch = settings.pitch;
          utterance.rate = settings.rate;
          utterance.volume = muted ? 0 : 1;
          utterance.onend = () => {
            if (runTokenRef.current !== runToken) return;
            if (statusRef.current === "playing") speakLine(lineIndex + 1);
          };
          utterance.onerror = (event) => {
            if (runTokenRef.current !== runToken) return;
            if (event.error === "canceled" || event.error === "interrupted") return;
            setNarrationStatus("idle");
          };
          window.speechSynthesis.speak(utterance);
        };

        speakLine(startIndex);
      });
    },
    [muted, scene, setNarrationStatus, supported]
  );

  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const refreshVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        speakerVoicesRef.current = selectBeyondTheGlassVoices(voices);
      }
    };

    refreshVoices();
    synth.addEventListener("voiceschanged", refreshVoices);
    return () => synth.removeEventListener("voiceschanged", refreshVoices);
  }, [supported]);

  useEffect(() => {
    if (sceneIdRef.current === scene.id) return;
    const shouldContinue = statusRef.current === "playing" && !muted;
    runTokenRef.current += 1;
    if (supported) window.speechSynthesis.cancel();
    sceneIdRef.current = scene.id;
    setActiveLineIndex(0);
    if (shouldContinue) {
      speakScene(0);
      return;
    }
    setNarrationStatus("idle");
  }, [muted, scene.id, setNarrationStatus, speakScene, supported]);

  useEffect(
    () => () => {
      runTokenRef.current += 1;
      if (supported) window.speechSynthesis.cancel();
    },
    [supported]
  );

  useEffect(() => {
    onActiveLineChange?.(status === "idle" ? null : activeLineIndex);
  }, [activeLineIndex, onActiveLineChange, status]);

  useEffect(() => {
    if (muted || !resumeAfterMuteRef.current) return;
    resumeAfterMuteRef.current = false;
    speakScene(activeLineIndex);
  }, [activeLineIndex, muted, speakScene]);

  const handlePlayPause = () => {
    if (!supported || muted) return;
    if (status === "playing") {
      window.speechSynthesis.pause();
      setNarrationStatus("paused");
      return;
    }
    if (status === "paused") {
      window.speechSynthesis.resume();
      setNarrationStatus("playing");
      return;
    }
    speakScene(activeLineIndex);
  };

  const handleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (nextMuted && status !== "idle") {
      resumeAfterMuteRef.current = true;
      runTokenRef.current += 1;
      if (supported) window.speechSynthesis.cancel();
      setNarrationStatus("paused");
    }
  };

  const activeLine = scene.narration[activeLineIndex] ?? scene.narration[0];

  return (
    <div
      className="btg-narration"
      aria-label="Narrated journey controls"
      data-status={status}
    >
      <div className="btg-narration__scene">
        <span>Scene {scene.number}</span>
        <strong>{scene.title}</strong>
      </div>

      <div className="btg-narration__buttons">
        <button
          className="btg-control btg-control--previous"
          type="button"
          onClick={() => onSceneRequest(Math.max(0, sceneIndex - 1))}
          disabled={sceneIndex === 0}
        >
          Previous scene
        </button>
        <button
          className="btg-control btg-control--narrate"
          type="button"
          onClick={handlePlayPause}
          disabled={!supported || muted}
        >
          {status === "playing" ? "Pause narration" : status === "paused" ? "Resume narration" : "Begin narrated journey"}
        </button>
        <button
          className="btg-control btg-control--stop"
          type="button"
          onClick={cancelSpeech}
          disabled={status === "idle"}
        >
          Stop
        </button>
        <button
          className="btg-control btg-control--mute"
          type="button"
          onClick={handleMute}
          aria-pressed={muted}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          className="btg-control btg-control--captions"
          type="button"
          onClick={() => onCaptionsChange(!captionsVisible)}
          aria-pressed={captionsVisible}
        >
          {captionsVisible ? "Hide captions" : "Show captions"}
        </button>
        <button
          className="btg-control btg-control--next"
          type="button"
          onClick={() => onSceneRequest(Math.min(sceneCount - 1, sceneIndex + 1))}
          disabled={sceneIndex === sceneCount - 1}
        >
          Next scene
        </button>
        <button
          className="btg-control btg-control--transcript"
          type="button"
          onClick={onTranscriptRequest}
        >
          Transcript
        </button>
      </div>

      {!supported ? (
        <p className="btg-narration__notice">Narration is unavailable in this browser. Captions and the transcript remain available.</p>
      ) : null}

      {captionsVisible && activeLine ? (
        <p className="btg-caption" aria-live={status === "playing" ? "polite" : "off"}>
          <strong>{activeLine.speaker}:</strong> {activeLine.text}
        </p>
      ) : null}
    </div>
  );
}
