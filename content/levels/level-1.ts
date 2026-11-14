import { lesson, type Level } from "../types";

export const level1: Level = {
  id: 1,
  title: "Sounds and politeness",
  blurb: "Say words the way they're written, greet people, and show respect with po.",
  dialogueId: "d1",
  lessons: [
    lesson(
      "1-1",
      "The five vowels",
      "Read any Tagalog word aloud.",
      [
        {
          title: "Five vowels, one sound each",
          examples: [
            { tl: "a · e · i · o · u", en: "ah · eh · ee · oh · oo" },
            { tl: "mesa", en: "table: MEH-sa" },
          ],
          body: "Tagalog spelling is regular. Each vowel has one sound, and every letter is pronounced. There are no silent letters and no tones.",
        },
        {
          title: "Two vowels = two beats",
          examples: [{ tl: "ilaw", en: "light: I-law" }],
          body: "When vowels sit next to each other, say each one separately. Don't blend them the way English does.",
        },
      ],
      [
        ["aso", "dog", { say: "A-so" }],
        ["ilaw", "light", { say: "I-law" }],
        ["ulo", "head", { say: "U-lo" }],
        ["mesa", "table", { say: "ME-sa" }],
        ["tubig", "water", { say: "TU-big" }],
        ["bata", "child", { say: "BA-ta'" }],
      ],
    ),
    lesson(
      "1-2",
      "Tricky sounds: ng and mga",
      "Handle the sounds and spellings English doesn't have.",
      [
        {
          title: "ng is one sound",
          examples: [
            { tl: "ngiti", en: "smile" },
            { tl: "langit", en: "sky: LA-ngit" },
          ],
          body: "ng is the sound at the end of “sing”. Tagalog also uses it at the start of words. Practise by saying “sing-ing” slowly, then drop the “si”.",
        },
        {
          title: "Two words that aren't said as written",
          examples: [
            { tl: "ng", en: "said “nang”" },
            { tl: "mga", en: "said “ma-NGA”" },
          ],
          body: "These two tiny words are abbreviations. ng links words (roughly “of”). mga goes before a noun to make it plural: bata = child, mga bata = children.",
        },
        {
          title: "Stress and the catch in the throat",
          examples: [
            { tl: "basa (BA-sa)", en: "read" },
            { tl: "basa (ba-SA')", en: "wet" },
          ],
          body: "Where you put the stress can change the meaning, and some words end in a glottal stop: a small catch in the throat, like the break in “uh-oh”. Neither is written in normal spelling, so this app shows a sound guide: CAPITALS for stress, ' for the catch.",
        },
      ],
      [
        ["ngiti", "smile", { say: "ngi-TI'" }],
        ["ngipin", "tooth", { say: "NGI-pin" }],
        ["langit", "sky", { say: "LA-ngit" }],
        ["pangalan", "name", { say: "pa-NGA-lan" }],
        ["tanong", "question", { say: "ta-NONG" }],
        ["mga bata", "children", { say: "ma-NGA BA-ta'" }],
      ],
    ),
    lesson(
      "1-3",
      "Greetings",
      "Greet someone at any time of day and ask how they are.",
      [
        {
          title: "Good + time of day",
          examples: [
            { tl: "Magandang umaga.", en: "Good morning." },
            { tl: "Magandang gabi.", en: "Good evening." },
          ],
          body: "Magandang means “beautiful”. Tagalog greetings literally say “beautiful morning”, “beautiful evening”. Swap the last word to change the time of day.",
        },
        {
          title: "Kumusta",
          examples: [
            { tl: "Kumusta ka?", en: "How are you?" },
            { tl: "Mabuti naman. Ikaw?", en: "I'm fine. And you?" },
          ],
          body: "Kumusta comes from Spanish “¿cómo está?”. It works as both “hello” and “how are you”. You will also see it spelled kamusta.",
        },
      ],
      [
        ["Kumusta ka?", "How are you?", { alt: ["Kamusta ka?"] }],
        ["Mabuti naman.", "I'm fine."],
        ["Ikaw?", "And you?"],
        ["Magandang umaga.", "Good morning."],
        ["Magandang hapon.", "Good afternoon."],
        ["Magandang gabi.", "Good evening."],
      ],
    ),
    lesson(
      "1-4",
      "Po and opo",
      "Speak respectfully to elders and strangers.",
      [
        {
          title: "Add po to show respect",
          examples: [
            { tl: "Magandang umaga po.", en: "Good morning (respectful)." },
            { tl: "Opo.", en: "Yes (respectful)." },
          ],
          body: "po has no English translation. It marks respect, a bit like “sir” or “ma'am” but far more common. opo is the respectful “yes”.",
        },
        {
          title: "ka becomes kayo",
          examples: [
            { tl: "Kumusta ka?", en: "How are you? (friend)" },
            { tl: "Kumusta po kayo?", en: "How are you? (elder)" },
          ],
          body: "With po, switch “you” from ka to kayo. kayo is also the word for “you” when talking to more than one person.",
        },
        {
          culture: true,
          title: "Who gets po?",
          body: "Use po with anyone older than you, with strangers, and with people serving you or in authority. Don't use it with friends your own age or with children. If in doubt, use it: too polite is never a problem.",
        },
        {
          culture: true,
          title: "Mano po",
          body: "When greeting grandparents and older relatives, many families do the mano: you take the elder's hand and touch the back of it to your forehead, saying “Mano po.” It asks for their blessing. Follow the family's lead on whether they do it.",
        },
      ],
      [
        ["Opo.", "Yes (respectful)."],
        ["kayo", "you (respectful, or more than one person)", { say: "ka-YO" }],
        ["Kumusta po kayo?", "How are you? (respectful)", { alt: ["Kamusta po kayo?"] }],
        ["Magandang umaga po.", "Good morning (respectful)."],
        ["Mabuti naman po.", "I'm fine (respectful)."],
        ["Mano po.", "Said when taking an elder's hand to your forehead"],
      ],
    ),
    lesson(
      "1-5",
      "Thank you, sorry, take care",
      "Handle the small courtesies.",
      [
        {
          title: "Salamat",
          examples: [
            { tl: "Maraming salamat po.", en: "Thank you very much (respectful)." },
            { tl: "Walang anuman.", en: "You're welcome." },
          ],
          body: "marami means “many”: “many thanks”. Walang anuman literally means “it's nothing”.",
        },
        {
          title: "Sige",
          examples: [{ tl: "Sige, ingat ka!", en: "Okay, take care!" }],
          body: "sige means “okay”, “go ahead” or “sure”. People also use it to end a conversation. “Sige, ingat” is a far more common goodbye than the textbook word paalam.",
        },
      ],
      [
        ["Salamat.", "Thank you.", { say: "sa-LA-mat" }],
        ["Maraming salamat po.", "Thank you very much (respectful)."],
        ["Walang anuman.", "You're welcome."],
        ["Pasensya na.", "Sorry.", { note: "For small things: being late, bumping into someone." }],
        ["Sige.", "Okay.", { say: "SI-ge" }],
        ["Ingat ka.", "Take care."],
      ],
    ),
    lesson(
      "1-6",
      "Yes, no, and “I don't understand”",
      "Answer simply and ask for help when you're lost.",
      [
        {
          title: "Oo and hindi",
          examples: [
            { tl: "Oo.", en: "Yes: O-o, two beats" },
            { tl: "Hindi po.", en: "No (respectful)." },
          ],
          body: "oo is casual “yes”; you already know the respectful one, opo. hindi is “no” and “not”. Add po to soften it for elders.",
        },
        {
          title: "Your survival phrases",
          examples: [
            { tl: "Hindi ko maintindihan.", en: "I don't understand." },
            { tl: "Pakiulit po.", en: "Please repeat that." },
          ],
          body: "Learn these as whole chunks for now. paki- at the start of a word means “please do this”.",
        },
      ],
      [
        ["Oo.", "Yes.", { say: "O-o" }],
        ["Hindi.", "No.", { say: "hin-DI'" }],
        ["Hindi po.", "No (respectful)."],
        ["Hindi ko alam.", "I don't know."],
        ["Hindi ko maintindihan.", "I don't understand."],
        ["Pakiulit po.", "Please repeat that."],
        ["Konti lang.", "Just a little.", { alt: ["Kaunti lang."], note: "A good answer to “Do you speak Tagalog?”" }],
      ],
    ),
  ],
};
