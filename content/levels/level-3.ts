import { lesson, type Level } from "../types";

export const level3: Level = {
  id: 3,
  title: "Sentence building",
  blurb: "The three markers (ang, ng, sa), linking words, questions and saying no.",
  dialogueId: "d3",
  lessons: [
    lesson(
      "3-1",
      "Describing things",
      "Say what something is like.",
      [
        {
          title: "Describing word first",
          examples: [
            { tl: "Maganda ang bahay.", en: "The house is beautiful." },
            { tl: "Mainit ang kape.", en: "The coffee is hot." },
          ],
          body: "English: “The house is beautiful.” Tagalog: “Beautiful the house.” The new information comes first, then ang + the thing you're talking about. Still no word for “is”.",
        },
        {
          title: "ma- words",
          examples: [
            { tl: "ganda → maganda", en: "beauty → beautiful" },
            { tl: "init → mainit", en: "heat → hot" },
          ],
          body: "Many describing words are a root plus ma-, meaning “having that quality”. Spotting the root will help you guess new words.",
        },
      ],
      [
        ["bahay", "house", { say: "BA-hay" }],
        ["Maganda ang bahay.", "The house is beautiful."],
        ["Malaki ang bahay.", "The house is big."],
        ["Maliit ang aso.", "The dog is small."],
        ["Mainit ang kape.", "The coffee is hot."],
        ["Malamig ang tubig.", "The water is cold."],
        ["Mabait siya.", "He/she is kind."],
      ],
    ),
    lesson(
      "3-2",
      "Ang, and si for names",
      "Mark who or what a sentence is about.",
      [
        {
          title: "ang for things, si for names",
          examples: [
            { tl: "Mabait ang lola ko.", en: "My grandmother is kind." },
            { tl: "Mabait si Ana.", en: "Ana is kind." },
          ],
          body: "ang marks the thing the sentence is about. A person's name takes si instead. For more than one named person, use sina.",
        },
        {
          title: "Nouns can come first too",
          examples: [
            { tl: "Guro ang nanay ko.", en: "My mother is a teacher." },
            { tl: "Estudyante ako.", en: "I'm a student." },
          ],
          body: "The same pattern works with nouns: say what they are first, then who.",
        },
      ],
      [
        ["Mabait si Ana.", "Ana is kind."],
        ["Matangkad si Carlo.", "Carlo is tall."],
        ["Mabait ang lola ko.", "My grandmother is kind."],
        ["Guro ang nanay ko.", "My mother is a teacher."],
        ["Estudyante ako.", "I'm a student."],
        ["Masaya sina Ana at Carlo.", "Ana and Carlo are happy."],
      ],
    ),
    lesson(
      "3-3",
      "Ng: of and possession",
      "Say whose something is.",
      [
        {
          title: "ng = of",
          examples: [
            { tl: "ang pangalan ng aso", en: "the name of the dog" },
            { tl: "ang bahay ni Carlo", en: "Carlo's house" },
          ],
          body: "ng (said “nang”) links a thing to its owner: thing first, owner second. For a person's name, use ni instead of ng.",
        },
        {
          title: "my, your, his/her",
          examples: [
            { tl: "ang pangalan mo", en: "your name" },
            { tl: "ang nanay niya", en: "his/her mother" },
          ],
          body: "ko = my, mo = your, niya = his/her. They follow the noun. These are the same ko and mo you used with gusto.",
        },
      ],
      [
        ["ang pangalan ng aso", "the dog's name"],
        ["Ito ang bahay ng lola ko.", "This is my grandmother's house."],
        ["Maganda ang bahay ni Carlo.", "Carlo's house is beautiful."],
        ["Mabait ang nanay niya.", "His/her mother is kind."],
        ["Ano ang pangalan mo?", "What's your name?"],
        ["Gusto ko ng kanin.", "I want rice."],
      ],
    ),
    lesson(
      "3-4",
      "Sa: place and direction",
      "Say where someone is and where you live.",
      [
        {
          title: "sa and nasa",
          examples: [
            { tl: "Nasa bahay ako.", en: "I'm at home." },
            { tl: "Nakatira ako sa London.", en: "I live in London." },
          ],
          body: "sa covers “in”, “at”, “on” and “to”. nasa means “is at / is in”. Nasaan? asks where someone or something is.",
        },
        {
          title: "para sa = for",
          examples: [
            { tl: "Para sa iyo.", en: "For you." },
            { tl: "Para kay Ana ito.", en: "This is for Ana." },
          ],
          body: "para sa means “for”. With a person's name, sa becomes kay. So each marker has a name version: ang → si, ng → ni, sa → kay.",
        },
      ],
      [
        ["Nasa bahay ako.", "I'm at home."],
        ["Nasa trabaho siya.", "He/she is at work."],
        ["Nasaan ka?", "Where are you?"],
        ["Nakatira ako sa London.", "I live in London."],
        ["Nasa Maynila ang lola ko.", "My grandmother is in Manila."],
        ["Para sa iyo.", "For you.", { alt: ["Para sa'yo.", "Para sayo."] }],
        ["Para kay Ana ito.", "This is for Ana."],
      ],
    ),
    lesson(
      "3-5",
      "Linkers: na and -ng",
      "Join a describing word to a noun.",
      [
        {
          title: "The glue between words",
          examples: [
            { tl: "mabait na bata", en: "kind child" },
            { tl: "magandang bahay", en: "beautiful house" },
          ],
          body: "A describing word and its noun must be joined by a linker. If the first word ends in a vowel, attach -ng to it. If it ends in a consonant, put na between them. (One exception: words ending in n take just -g.)",
        },
        {
          title: "You've been using it since Level 1",
          examples: [
            { tl: "maganda + umaga → Magandang umaga", en: "Good morning" },
            { tl: "isa + kape → isang kape", en: "one coffee" },
          ],
          body: "That's what the -ng in Magandang umaga is. Numbers link the same way.",
        },
      ],
      [
        ["magandang bahay", "beautiful house"],
        ["malaking aso", "big dog"],
        ["mabait na bata", "kind child"],
        ["mainit na kape", "hot coffee"],
        ["malamig na tubig", "cold water"],
        ["maliit na bahay", "small house"],
        ["Isang kape po.", "One coffee, please."],
      ],
    ),
    lesson(
      "3-6",
      "Questions",
      "Ask what, who, where, when, why and how much.",
      [
        {
          title: "Question words go first",
          examples: [
            { tl: "Ano ito?", en: "What's this?" },
            { tl: "Magkano ito?", en: "How much is this?" },
          ],
          body: "Start with the question word. Magkano? is the one you'll need at every market stall.",
        },
        {
          title: "ba makes a yes/no question",
          examples: [
            { tl: "Pagod ka.", en: "You're tired." },
            { tl: "Pagod ka ba?", en: "Are you tired?" },
          ],
          body: "Drop ba into a statement to turn it into a yes/no question. It usually sits after the first word, or after ka if there is one.",
        },
      ],
      [
        ["Ano ito?", "What's this?"],
        ["Sino siya?", "Who is he/she?"],
        ["Saan ka nakatira?", "Where do you live?"],
        ["Taga-saan ka?", "Where are you from?", { alt: ["Taga saan ka?", "Tagasaan ka?"] }],
        ["Kailan?", "When?"],
        ["Bakit?", "Why?"],
        ["Magkano ito?", "How much is this?"],
        ["Pagod ka ba?", "Are you tired?"],
      ],
    ),
    lesson(
      "3-7",
      "Saying no: hindi and wala",
      "Choose the right kind of “no”.",
      [
        {
          title: "hindi = not",
          examples: [
            { tl: "Hindi ako pagod.", en: "I'm not tired." },
            { tl: "Hindi mainit ang kape.", en: "The coffee isn't hot." },
          ],
          body: "hindi says something isn't so. Notice ako moves to sit right after hindi: short pronouns like to be second in the sentence.",
        },
        {
          title: "wala = there's none",
          examples: [
            { tl: "Walang tubig.", en: "There's no water." },
            { tl: "Wala akong kapatid.", en: "I don't have siblings." },
          ],
          body: "wala says something doesn't exist or you don't have it. It's the opposite of may. The linker -ng attaches to wala, or to the pronoun if one follows it.",
        },
      ],
      [
        ["Hindi ako pagod.", "I'm not tired."],
        ["Hindi siya guro.", "He/she isn't a teacher."],
        ["Hindi mainit ang kape.", "The coffee isn't hot."],
        ["Walang tubig.", "There's no water."],
        ["May kapatid ka ba?", "Do you have siblings?"],
        ["Wala akong kapatid.", "I don't have siblings."],
        ["Wala siya dito.", "He/she isn't here.", { alt: ["Wala siya rito."] }],
      ],
    ),
  ],
};
