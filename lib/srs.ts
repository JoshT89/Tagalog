/**
 * Spaced repetition, based on SM-2 (the algorithm behind Anki's ancestors).
 * Difference from textbook SM-2: the second interval is 3 days instead of 6,
 * which suits a beginner doing short daily sessions.
 */
export type Card = {
  id: string;
  ease: number; // how easy this item is for you; starts at 2.5, never below 1.3
  interval: number; // days until next review
  reps: number; // correct reviews in a row
  lapses: number;
  due: number; // timestamp (ms)
  added: number;
};

const DAY = 86_400_000;
export const startOfDay = (t: number) => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export function newCard(id: string, now: number, dueNow = false): Card {
  return { id, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: dueNow ? now : startOfDay(now) + DAY, added: now };
}

/** quality: 0–5. Below 3 = you got it wrong. 3 = hard, 4 = good, 5 = easy. */
export function review(card: Card, quality: number, now: number): Card {
  const q = Math.max(0, Math.min(5, quality));
  const ease = Math.max(1.3, card.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  if (q < 3) {
    // Wrong: start the item again and show it later this session.
    return { ...card, ease, reps: 0, interval: 0, lapses: card.lapses + 1, due: now + 10 * 60_000 };
  }
  const reps = card.reps + 1;
  const interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.max(card.interval + 1, Math.round(card.interval * ease));
  return { ...card, ease, reps, interval, due: startOfDay(now) + interval * DAY };
}

export const isDue = (c: Card, now: number) => c.due <= now;
