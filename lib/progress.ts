import { path, type Node } from "@/content";
import type { State } from "./store";
import { isDue } from "./srs";

export const isDone = (n: Node, s: State) => (n.kind === "lesson" ? !!s.lessons[n.id] : !!s.dialogues[n.id]);

/** A lesson or conversation unlocks when the one before it is finished. */
export function isUnlocked(kind: Node["kind"], id: string, s: State) {
  const i = path.findIndex((n) => n.kind === kind && n.id === id);
  if (i <= 0) return i === 0;
  return isDone(path[i - 1], s);
}

export const nextNode = (s: State): Node | undefined => path.find((n) => !isDone(n, s));

export const dueCards = (s: State, now: number) =>
  Object.values(s.cards)
    .filter((c) => isDue(c, now))
    .sort((a, b) => a.due - b.due);

export const hrefFor = (n: Node) => (n.kind === "lesson" ? `/learn/${n.id}` : `/talk/${n.id}`);
