import { lesson, type Level } from "../types";

export const level6: Level = {
  id: 6,
  title: "Real conversations",
  blurb: "Put it together: introductions, the market, food, directions, family, and Taglish.",
  planned: ["At the market", "Ordering food", "Asking directions", "Family chat", "Taglish: how people really talk"],
  lessons: [
    lesson(
      "6-1",
      "Introductions",
      "Introduce yourself and ask about someone else.",
      [
        {
          title: "Ako si…",
          examples: [
            { tl: "Ako si Sam.", en: "I'm Sam." },
            { tl: "Taga-London ako.", en: "I'm from London." },
          ],
          body: "Use si before your own name too. taga- before a place means “from”.",
        },
        {
          title: "Respectful questions",
          examples: [{ tl: "Ano po ang pangalan ninyo?", en: "What's your name? (respectful)" }],
          body: "ninyo is the respectful (and plural) form of mo. The pattern holds everywhere: ka → kayo, mo → ninyo.",
        },
        {
          culture: true,
          title: "Taglish is normal",
          body: "In everyday speech, especially in cities, people switch between Tagalog and English mid-sentence. “Nice to meet you po!” is at least as common as the formal Tagalog phrase. Mixing in English words you don't know in Tagalog is how many Filipinos talk; it isn't a mistake.",
        },
        {
          culture: true,
          title: "Personal questions",
          body: "Being asked your age, whether you're married, or what you do for work within minutes of meeting is normal and friendly. It helps people work out how to address you (kuya, ate, po).",
        },
      ],
      [
        ["Ako si Sam.", "I'm Sam."],
        ["Ano po ang pangalan ninyo?", "What's your name? (respectful)"],
        ["Taga-London ako.", "I'm from London.", { alt: ["Taga London ako."] }],
        ["Nag-aaral ako ng Tagalog.", "I'm learning Tagalog.", { alt: ["Nagaaral ako ng Tagalog."] }],
        ["Marunong ka bang mag-Tagalog?", "Can you speak Tagalog?", { alt: ["Marunong ka bang magtagalog?"] }],
        ["Ilang taon ka na?", "How old are you?"],
        ["Ikinagagalak kong makilala ka.", "Pleased to meet you. (formal)"],
      ],
    ),
  ],
};
