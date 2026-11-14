import { lesson, type Level } from "../types";

export const level2: Level = {
  id: 2,
  title: "Core words",
  blurb: "The words you'll use every day: people, numbers, family, food and time.",
  dialogueId: "d2",
  lessons: [
    lesson(
      "2-1",
      "I, you, he/she",
      "Say how you or someone else is feeling.",
      [
        {
          title: "No word for “am” or “is”",
          examples: [
            { tl: "Gutom ako.", en: "I'm hungry. (hungry I)" },
            { tl: "Masaya siya.", en: "He/she is happy. (happy he/she)" },
          ],
          body: "Tagalog has no “am / is / are”. Put the describing word first, then the person. That's a complete sentence.",
        },
        {
          title: "siya is he and she",
          examples: [{ tl: "Pagod siya.", en: "He's tired. / She's tired." }],
          body: "Tagalog pronouns have no gender. siya covers both. It's usually said quickly, like “sha”.",
        },
        {
          title: "ka or ikaw?",
          examples: [
            { tl: "Pagod ka.", en: "You're tired." },
            { tl: "Ikaw?", en: "You? / And you?" },
          ],
          body: "Both mean “you”. Use ka inside a sentence, after the first word. Use ikaw when it stands alone or comes first.",
        },
      ],
      [
        ["ako", "I", { say: "a-KO" }],
        ["ka", "you (inside a sentence)"],
        ["siya", "he / she", { say: "si-YA, often “sha”" }],
        ["Gutom ako.", "I'm hungry."],
        ["Pagod ka.", "You're tired."],
        ["Masaya siya.", "He/she is happy."],
      ],
    ),
    lesson(
      "2-2",
      "We, you all, they",
      "Talk about groups, and pick the right “we”.",
      [
        {
          title: "Two kinds of “we”",
          examples: [
            { tl: "Kain tayo!", en: "Let's eat! (you and me)" },
            { tl: "Pagod kami.", en: "We're tired. (us, not you)" },
          ],
          body: "tayo includes the person you're talking to. kami leaves them out. English makes you guess; Tagalog makes you choose.",
        },
        {
          title: "sila",
          examples: [{ tl: "Masaya sila.", en: "They're happy." }],
          body: "sila is “they”. And you already know kayo: “you” for a group, or for one person you're showing respect to.",
        },
      ],
      [
        ["tayo", "we (including you)", { say: "TA-yo" }],
        ["kami", "we (not including you)", { say: "ka-MI" }],
        ["sila", "they", { say: "si-LA" }],
        ["Pagod kami.", "We're tired (not you)."],
        ["Masaya sila.", "They're happy."],
        ["Kain tayo!", "Let's eat!", { alt: ["Kumain tayo!"], note: "A very common invitation. Expect to hear it whenever food is out." }],
      ],
    ),
    lesson(
      "2-3",
      "Numbers 1 to 10",
      "Count to ten.",
      [
        {
          title: "Tagalog numbers",
          examples: [
            { tl: "isa, dalawa, tatlo", en: "one, two, three" },
            { tl: "dalawang kape", en: "two coffees" },
          ],
          body: "Use these for counting things. When a number comes before a noun it takes a linking -ng (or na). You'll learn that rule properly in Level 3.",
        },
        {
          culture: true,
          title: "Three number systems",
          body: "Filipinos mix three sets of numbers. Tagalog numbers for counting things, Spanish-derived numbers for telling the time and often for prices (alas-dos = two o'clock, bente = twenty), and plain English numbers for almost anything. Using English numbers is normal and nobody will mind.",
        },
      ],
      [
        ["isa", "one", { say: "i-SA" }],
        ["dalawa", "two", { say: "da-la-WA" }],
        ["tatlo", "three", { say: "tat-LO" }],
        ["apat", "four", { say: "A-pat" }],
        ["lima", "five", { say: "li-MA" }],
        ["anim", "six", { say: "A-nim" }],
        ["pito", "seven", { say: "pi-TO" }],
        ["walo", "eight", { say: "wa-LO" }],
        ["siyam", "nine", { say: "si-YAM" }],
        ["sampu", "ten", { say: "sam-PU'" }],
      ],
    ),
    lesson(
      "2-4",
      "Family",
      "Name your family members and introduce one.",
      [
        {
          title: "This is my…",
          examples: [
            { tl: "Ito ang nanay ko.", en: "This is my mother." },
            { tl: "Ito ang kuya ko.", en: "This is my older brother." },
          ],
          body: "ito = this. ko = my, and it comes after the thing owned: nanay ko = “mother my”.",
        },
        {
          culture: true,
          title: "Kuya and ate are titles",
          body: "kuya (older brother) and ate (older sister) are used as titles before the name, as in Kuya Ben or Ate Joy, and you use them instead of the bare name. They're also used for older cousins, and politely for slightly older strangers such as a shop assistant or driver.",
        },
        {
          culture: true,
          title: "Tito and tita",
          body: "tito (uncle) and tita (aunt) are also what you call your parents' friends and your friends' parents. Calling an older family friend by first name alone can come across as rude.",
        },
      ],
      [
        ["nanay", "mother", { say: "NA-nay" }],
        ["tatay", "father", { say: "TA-tay" }],
        ["kuya", "older brother", { say: "KU-ya" }],
        ["ate", "older sister", { say: "A-te" }],
        ["lolo", "grandfather", { say: "LO-lo" }],
        ["lola", "grandmother", { say: "LO-la" }],
        ["anak", "child (son or daughter)", { say: "a-NAK" }],
        ["kapatid", "sibling", { say: "ka-pa-TID" }],
        ["Ito ang nanay ko.", "This is my mother."],
      ],
    ),
    lesson(
      "2-5",
      "Food",
      "Name what's on the table and say it's good.",
      [
        {
          title: "At the table",
          examples: [
            { tl: "Masarap!", en: "Delicious!" },
            { tl: "Busog na ako.", en: "I'm full." },
          ],
          body: "Masarap is the highest compliment to a cook. Busog na ako is how you politely stop the food coming.",
        },
        {
          culture: true,
          title: "Kanin and ulam",
          body: "A Filipino meal is kanin (cooked rice) plus ulam, which is whatever is eaten with the rice: meat, fish or vegetables. English has no single word for ulam. Rice is served at most meals, including breakfast.",
        },
      ],
      [
        ["kanin", "cooked rice", { say: "KA-nin" }],
        ["ulam", "the dish eaten with rice", { say: "U-lam" }],
        ["manok", "chicken", { say: "ma-NOK" }],
        ["isda", "fish", { say: "is-DA'" }],
        ["gulay", "vegetables", { say: "GU-lay" }],
        ["kape", "coffee", { say: "ka-PE" }],
        ["Masarap!", "Delicious!"],
        ["Busog na ako.", "I'm full."],
      ],
    ),
    lesson(
      "2-6",
      "Time words",
      "Say when something happens.",
      [
        {
          title: "Today, later, tomorrow",
          examples: [
            { tl: "Mamaya na.", en: "Later. / Not now." },
            { tl: "Bukas na lang.", en: "Let's just do it tomorrow." },
          ],
          body: "mamaya means later today. For anything after today, use bukas (tomorrow) or name the day.",
        },
        {
          title: "Doubling a word",
          examples: [{ tl: "araw-araw", en: "every day (day-day)" }],
          body: "araw means day (and sun). Repeating a word often means “every” or “very”. You'll see this pattern a lot.",
        },
      ],
      [
        ["ngayon", "now / today", { say: "nga-YON" }],
        ["mamaya", "later today", { say: "ma-ma-YA'" }],
        ["bukas", "tomorrow", { say: "BU-kas", note: "With the stress at the end (bu-KAS) it means “open”." }],
        ["kahapon", "yesterday", { say: "ka-HA-pon" }],
        ["araw-araw", "every day"],
        ["Mamaya na.", "Later. / Not now."],
        ["Bukas na lang.", "Let's just do it tomorrow."],
      ],
    ),
    lesson(
      "2-7",
      "Want, need, have",
      "Say what you want, need, have and don't have.",
      [
        {
          title: "gusto and kailangan",
          examples: [
            { tl: "Gusto ko ng kape.", en: "I want coffee." },
            { tl: "Kailangan ko ng tubig.", en: "I need water." },
          ],
          body: "With gusto and kailangan, “I” is ko and “you” is mo. The thing you want follows ng (said “nang”).",
        },
        {
          title: "may and wala",
          examples: [
            { tl: "May tanong ako.", en: "I have a question." },
            { tl: "Wala.", en: "None. / There isn't any." },
          ],
          body: "may means “there is” or “have”. wala is its opposite. As a one-word answer, “there is” is Meron.",
        },
        {
          culture: true,
          title: "Saying no to food",
          body: "A flat “Ayaw ko” (I don't want it) to offered food sounds blunt. Softer: “Busog pa po ako” (I'm still full) or “Mamaya na po” (later).",
        },
      ],
      [
        ["Gusto ko ng kape.", "I want coffee."],
        ["Gusto mo?", "Do you want some?"],
        ["Ayaw ko.", "I don't want to.", { note: "Blunt. Fine with friends, too direct with elders." }],
        ["Kailangan ko ng tubig.", "I need water."],
        ["May tanong ako.", "I have a question."],
        ["Meron.", "There is. / I have some.", { alt: ["Mayroon."] }],
        ["Wala.", "None. / There isn't any.", { say: "wa-LA'" }],
      ],
    ),
  ],
};
