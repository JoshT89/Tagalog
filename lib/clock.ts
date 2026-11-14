"use client";
import { useSyncExternalStore } from "react";

/** The current time, refreshed every 30 seconds, so "due" counts stay fresh without impure renders. */
let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(l: () => void) {
  listeners.add(l);
  if (!timer)
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((x) => x());
    }, 30_000);
  return () => {
    listeners.delete(l);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

export function useNow(): number {
  return useSyncExternalStore(
    subscribe,
    () => now || (now = Date.now()),
    () => 0,
  );
}

/** Call after an action that changes what's due, so screens update straight away. */
export function tick() {
  now = Date.now();
  listeners.forEach((x) => x());
}
