import { level1 } from "./levels/level-1";
import { level2 } from "./levels/level-2";
import { level3 } from "./levels/level-3";
import { level4 } from "./levels/level-4";
import { level5 } from "./levels/level-5";
import { level6 } from "./levels/level-6";
import { dialogues } from "./dialogues";
import type { Dialogue, Item, Lesson, Level } from "./types";

/** To add a level, write it in content/levels/ and add it to this list. */
export const levels: Level[] = [level1, level2, level3, level4, level5, level6];
export { dialogues };

export const allLessons: Lesson[] = levels.flatMap((l) => l.lessons);
export const allItems: Item[] = allLessons.flatMap((l) => l.items);

const itemMap = new Map(allItems.map((i) => [i.id, i]));
export const getItem = (id: string) => itemMap.get(id);
export const getLesson = (id: string) => allLessons.find((l) => l.id === id);
export const getDialogue = (id: string): Dialogue | undefined => dialogues.find((d) => d.id === id);
export const levelOfLesson = (id: string) => levels.find((l) => l.lessons.some((x) => x.id === id));

/** The order things unlock in: each level's lessons, then its conversation. */
export type Node = { kind: "lesson" | "dialogue"; id: string; level: number };
export const path: Node[] = levels.flatMap((l) => [
  ...l.lessons.map((x): Node => ({ kind: "lesson", id: x.id, level: l.id })),
  ...(l.dialogueId ? [{ kind: "dialogue", id: l.dialogueId, level: l.id } as Node] : []),
]);
