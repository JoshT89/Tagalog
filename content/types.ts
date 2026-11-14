/** One thing to learn: a word, phrase or sentence. */
export type Item = {
  id: string;
  /** Tagalog, as normally written (no accent marks). */
  tl: string;
  /** English meaning. Must be unique enough to tell items apart in a quiz. */
  en: string;
  /** Optional sound guide. CAPITALS = stressed syllable, ' = glottal stop (catch in the throat). */
  say?: string;
  /** Optional one-line usage note. */
  note?: string;
  /** Other spellings/wordings accepted when typing. */
  alt?: string[];
};

/** A short teaching card: examples first, then the plain explanation. */
export type Teach = {
  title: string;
  examples?: { tl: string; en: string }[];
  body: string;
  /** Marks a cultural note (shown with a different label). */
  culture?: boolean;
};

export type Lesson = {
  id: string;
  title: string;
  goal: string;
  teach: Teach[];
  items: Item[];
};

export type Level = {
  id: number;
  title: string;
  blurb: string;
  lessons: Lesson[];
  /** Titles of lessons not written yet. Shown greyed out on the map. */
  planned?: string[];
  /** The conversation that ends the level. */
  dialogueId?: string;
};

export type Option = { tl: string; en: string; correct?: boolean; why: string };

export type Turn =
  | { who: "them"; tl: string; en: string }
  | { who: "you"; prompt: string; options: Option[] }
  | { who: "you"; prompt: string; accept: string[]; model: string; modelEn: string; why: string };

export type Dialogue = {
  id: string;
  level: number;
  title: string;
  scene: string;
  partner: string;
  turns: Turn[];
  culture?: string;
};

type ItemTuple = [tl: string, en: string, extra?: Partial<Pick<Item, "say" | "note" | "alt">>];

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Helper for writing lessons compactly. Item ids come from the lesson id + the Tagalog text. */
export function lesson(id: string, title: string, goal: string, teach: Teach[], items: ItemTuple[]): Lesson {
  return {
    id,
    title,
    goal,
    teach,
    items: items.map(([tl, en, extra]) => ({ id: `${id}:${slug(tl)}`, tl, en, ...extra })),
  };
}
