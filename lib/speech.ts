"use client";
import { useSyncExternalStore } from "react";

/**
 * Audio uses the browser's built-in speech. We only ever use a Filipino voice.
 * If the browser has none, audio is switched off rather than read Tagalog in an
 * English voice, which would teach the wrong sounds.
 */
export type VoiceStatus = "loading" | "ready" | "none" | "unsupported";

let voice: SpeechSynthesisVoice | null = null;
let status: VoiceStatus = "loading";
let started = false;
const listeners = new Set<() => void>();

const isFilipino = (v: SpeechSynthesisVoice) => /^(fil|tl)([-_]|$)/i.test(v.lang);

function refresh() {
  const voices = window.speechSynthesis.getVoices();
  const found = voices.find(isFilipino) ?? null;
  const next: VoiceStatus = found ? "ready" : voices.length > 0 ? "none" : status === "loading" ? "loading" : "none";
  if (found !== voice || next !== status) {
    voice = found;
    status = next;
    listeners.forEach((l) => l());
  }
}

function start() {
  if (started) return;
  started = true;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    status = "unsupported";
    return;
  }
  refresh();
  window.speechSynthesis.addEventListener("voiceschanged", refresh);
  // Some browsers never fire voiceschanged. Stop waiting after 2.5 seconds.
  setTimeout(() => {
    if (status === "loading") {
      status = "none";
      listeners.forEach((l) => l());
    }
  }, 2500);
}

const subscribe = (l: () => void) => {
  start();
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useVoiceStatus(): VoiceStatus {
  return useSyncExternalStore(subscribe, () => status, () => "loading" as VoiceStatus);
}

export const voiceName = () => voice?.name ?? null;

export function speak(text: string, slow = false) {
  if (status !== "ready" || !voice) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[·→]/g, ","));
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = slow ? 0.65 : 0.9;
  synth.speak(u);
  return true;
}
