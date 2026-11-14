"use client";
import { useSyncExternalStore } from "react";
import { tick } from "./clock";
import { type Card, newCard, review, startOfDay } from "./srs";

/** Everything saved on this device. Bump VERSION and migrate in load() if the shape changes. */
export type State = {
  version: 1;
  cards: Record<string, Card>;
  lessons: Record<string, { best: number; doneAt: number }>;
  dialogues: Record<string, { doneAt: number }>;
  streak: { count: number; lastDay: number };
  slowAudio: boolean;
};

const KEY = "tagalog-progress-v1";
const fresh = (): State => ({ version: 1, cards: {}, lessons: {}, dialogues: {}, streak: { count: 0, lastDay: 0 }, slowAudio: false });

let state: State | null = null;
const listeners = new Set<() => void>();

function load(): State {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? { ...fresh(), ...(JSON.parse(raw) as State) } : fresh();
  } catch {
    state = fresh();
  }
  return state;
}

function update(fn: (s: State) => State) {
  state = fn(load());
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: keep going in memory */
  }
  listeners.forEach((l) => l());
  tick();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Returns null on the server and during the first client render, then the saved state. */
export function useStore(): State | null {
  return useSyncExternalStore(subscribe, load, () => null);
}

const DAY = 86_400_000;
function touchStreak(s: State, now: number): State["streak"] {
  const today = startOfDay(now);
  if (s.streak.lastDay === today) return s.streak;
  const yesterday = startOfDay(today - DAY / 2);
  return { count: s.streak.lastDay === yesterday ? s.streak.count + 1 : 1, lastDay: today };
}

/** The streak only counts if you studied today or yesterday. */
export function currentStreak(s: State, now: number) {
  const today = startOfDay(now);
  const yesterday = startOfDay(today - DAY / 2);
  return s.streak.lastDay === today || s.streak.lastDay === yesterday ? s.streak.count : 0;
}

export const actions = {
  completeLesson(lessonId: string, score: number, itemIds: string[], missedIds: string[]) {
    const now = Date.now();
    update((s) => {
      const cards = { ...s.cards };
      for (const id of itemIds) if (!cards[id]) cards[id] = newCard(id, now, missedIds.includes(id));
      const prev = s.lessons[lessonId];
      return {
        ...s,
        cards,
        lessons: { ...s.lessons, [lessonId]: { best: Math.max(prev?.best ?? 0, score), doneAt: prev?.doneAt ?? now } },
        streak: touchStreak(s, now),
      };
    });
  },
  completeDialogue(id: string) {
    const now = Date.now();
    update((s) => ({ ...s, dialogues: { ...s.dialogues, [id]: { doneAt: s.dialogues[id]?.doneAt ?? now } }, streak: touchStreak(s, now) }));
  },
  grade(cardId: string, quality: number) {
    const now = Date.now();
    update((s) => {
      const card = s.cards[cardId];
      if (!card) return s;
      return { ...s, cards: { ...s.cards, [cardId]: review(card, quality, now) }, streak: touchStreak(s, now) };
    });
  },
  setSlowAudio(slowAudio: boolean) {
    update((s) => ({ ...s, slowAudio }));
  },
  reset() {
    update(() => fresh());
  },
};
