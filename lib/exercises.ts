import type { Item } from "@/content/types";

export type Exercise =
  | { kind: "choice"; item: Item; dir: "tl-en" | "en-tl"; options: string[]; answer: string }
  | { kind: "listen"; item: Item; options: string[]; answer: string }
  | { kind: "tiles"; item: Item; tiles: string[] }
  | { kind: "type"; item: Item }
  | { kind: "speak"; item: Item };

/** Lower-case, strip accents and punctuation, so "Opo!" matches "opo". */
export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const squash = (s: string) => norm(s).replace(/ /g, "");

/** True if what was typed matches the item or one of its accepted alternatives. Spacing and hyphens are forgiven. */
export function matches(input: string, accepted: string[]) {
  const got = squash(input);
  return got.length > 0 && accepted.some((a) => squash(a) === got);
}
export const acceptedFor = (item: Item) => [item.tl, ...(item.alt ?? [])];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const wordCount = (item: Item) => item.tl.trim().split(/\s+/).length;

/** Wrong options: similar-sized items first, never one with the same answer. */
function distractors(item: Item, pool: Item[], field: "tl" | "en", n = 3): string[] {
  const seen = new Set([norm(item[field])]);
  const wc = wordCount(item);
  const ranked = shuffle(pool.filter((p) => p.id !== item.id && norm(p.en) !== norm(item.en) && norm(p.tl) !== norm(item.tl))).sort(
    (a, b) => Math.abs(wordCount(a) - wc) - Math.abs(wordCount(b) - wc),
  );
  const out: string[] = [];
  for (const p of ranked) {
    const k = norm(p[field]);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p[field]);
    if (out.length === n) break;
  }
  return out;
}

export function makeChoice(item: Item, dir: "tl-en" | "en-tl", pool: Item[]): Exercise {
  const field = dir === "tl-en" ? "en" : "tl";
  return { kind: "choice", item, dir, answer: item[field], options: shuffle([item[field], ...distractors(item, pool, field)]) };
}

export function makeListen(item: Item, pool: Item[]): Exercise {
  return { kind: "listen", item, answer: item.en, options: shuffle([item.en, ...distractors(item, pool, "en")]) };
}

const NAME = /^(Ana|Carlo|London|Maynila|Sam|Tagalog|Nanay)\b/;
export function tokens(tl: string): string[] {
  const t = tl.replace(/[.?!,]/g, "").trim().split(/\s+/);
  if (t.length && !NAME.test(t[0])) t[0] = t[0].toLowerCase();
  return t;
}

export function makeTiles(item: Item, pool: Item[]): Exercise {
  const own = tokens(item.tl);
  const have = new Set(own.map(norm));
  const extra: string[] = [];
  for (const p of shuffle(pool)) {
    for (const t of tokens(p.tl)) {
      if (!have.has(norm(t))) {
        have.add(norm(t));
        extra.push(t);
        break;
      }
    }
    if (extra.length === 2) break;
  }
  return { kind: "tiles", item, tiles: shuffle([...own, ...extra]) };
}

/** A "make me produce it" exercise sized to the item. */
export function makeProduction(item: Item, pool: Item[]): Exercise {
  const wc = wordCount(item);
  if (wc >= 4) return makeTiles(item, pool);
  if (wc >= 2) return Math.random() < 0.5 ? makeTiles(item, pool) : { kind: "type", item };
  return { kind: "type", item };
}

/** Review exercise that gets harder as the card matures. */
export function makeReview(item: Item, reps: number, pool: Item[], hasVoice: boolean): Exercise {
  if (reps <= 0) return hasVoice && Math.random() < 0.5 ? makeListen(item, pool) : makeChoice(item, "tl-en", pool);
  if (reps === 1) return makeChoice(item, "en-tl", pool);
  if (reps === 2) return makeProduction(item, pool);
  return Math.random() < 0.35 ? { kind: "speak", item } : makeProduction(item, pool);
}
