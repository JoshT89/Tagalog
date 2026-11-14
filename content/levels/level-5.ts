import { lesson, type Level } from "../types";

export const level5: Level = {
  id: 5,
  title: "Little words",
  blurb: "The small particles that make you sound natural: na, pa, ba, naman, daw, kasi.",
  planned: ["ba, and where little words sit", "naman", "daw / raw: “they say”", "kasi: because", "lang and din / rin"],
  lessons: [
    lesson(
      "5-1",
      "na and pa",
      "Say “already”, “now”, “still” and “not yet”.",
      [
        {
          title: "na = already / now",
          examples: [
            { tl: "Kumain ka na?", en: "Have you eaten yet?" },
            { tl: "Gutom na ako.", en: "I'm hungry now." },
          ],
          body: "na signals a change: something has happened, or is now the case. This na is a different word from the linker na you learned in Level 3.",
        },
        {
          title: "pa = still / more / yet",
          examples: [
            { tl: "Gutom pa ako.", en: "I'm still hungry." },
            { tl: "Hindi pa.", en: "Not yet." },
          ],
          body: "pa signals no change yet, or something extra. Compare the pairs: Wala na = all gone. Wala pa = none yet.",
        },
        {
          culture: true,
          title: "“Kumain ka na?”",
          body: "“Have you eaten?” is a greeting as much as a question. It's a way of showing care, and often comes straight after hello. “Opo, kumain na po” (yes, I've eaten) is a fine answer.",
        },
      ],
      [
        ["Kumain ka na?", "Have you eaten yet?"],
        ["Kumain na ako.", "I've already eaten."],
        ["Hindi pa.", "Not yet."],
        ["Gutom na ako.", "I'm hungry now."],
        ["Gutom pa ako.", "I'm still hungry."],
        ["Isa pa.", "One more."],
        ["Wala na.", "All gone. / No more."],
        ["Tara na!", "Let's go!"],
      ],
    ),
  ],
};
