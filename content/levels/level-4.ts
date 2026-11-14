import { lesson, type Level } from "../types";

export const level4: Level = {
  id: 4,
  title: "Verbs",
  blurb: "How Tagalog verbs show whether something is done, happening, or still to come.",
  planned: [
    "mag- verbs: happening now and not yet started",
    "-um- verbs",
    "-in verbs: when the object is the focus",
    "Choosing between mag-, -um- and -in",
    "Mixed verb practice",
  ],
  lessons: [
    lesson(
      "4-1",
      "mag- verbs: done",
      "Say what someone did.",
      [
        {
          title: "mag- becomes nag-",
          examples: [
            { tl: "magluto → nagluto", en: "to cook → cooked" },
            { tl: "Nagluto ako.", en: "I cooked." },
          ],
          body: "Many action words are a root with mag- on the front (luto = cooking, magluto = to cook). To say it's done, change the m to n.",
        },
        {
          title: "Done, not “past”",
          examples: [{ tl: "Nag-aral siya kahapon.", en: "He/she studied yesterday." }],
          body: "Tagalog verbs don't mark past, present and future. They mark whether an action is completed, in progress, or not yet started. nag- means completed. A hyphen is written when the root starts with a vowel: nag-aral.",
        },
        {
          title: "Who did it, and to what",
          examples: [{ tl: "Nagluto si Nanay ng manok.", en: "Mum cooked chicken." }],
          body: "With mag- verbs, the doer takes ang or si, and the thing acted on takes ng. Verb first, as always.",
        },
      ],
      [
        ["Nagluto ako.", "I cooked."],
        ["Nagluto si Nanay ng manok.", "Mum cooked chicken."],
        ["Nag-aral siya kahapon.", "He/she studied yesterday.", { alt: ["Nagaral siya kahapon."] }],
        ["Nagtrabaho ako kahapon.", "I worked yesterday."],
        ["Naglinis kami ng bahay.", "We cleaned the house."],
        ["Naglaro ang mga bata.", "The children played."],
      ],
    ),
  ],
};
