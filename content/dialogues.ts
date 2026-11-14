import type { Dialogue } from "./types";

export const dialogues: Dialogue[] = [
  {
    id: "d1",
    level: 1,
    title: "Greeting Lola",
    partner: "Lola Remy",
    scene: "It's mid-afternoon. You arrive at a friend's house and their grandmother opens the door.",
    culture:
      "Notice she used ka with you and you used po and kayo with her. Respect language runs one way: from younger to older.",
    turns: [
      { who: "them", tl: "Magandang hapon!", en: "Good afternoon!" },
      {
        who: "you",
        prompt: "Greet her back.",
        options: [
          { tl: "Magandang hapon po.", en: "Good afternoon (respectful).", correct: true, why: "Right greeting for the afternoon, and po because she's your elder." },
          { tl: "Magandang hapon.", en: "Good afternoon.", why: "The words are right, but to a grandmother you need po." },
          { tl: "Magandang gabi po.", en: "Good evening (respectful).", why: "gabi is evening. It's afternoon, so hapon." },
        ],
      },
      { who: "them", tl: "Kumusta ka?", en: "How are you?" },
      {
        who: "you",
        prompt: "Say you're fine and ask how she is.",
        options: [
          { tl: "Mabuti naman po. Kayo po?", en: "I'm fine. And you? (respectful)", correct: true, why: "po on both parts, and kayo instead of ikaw for an elder." },
          { tl: "Mabuti naman. Ikaw?", en: "I'm fine. And you?", why: "This is how you'd answer a friend. For an elder: add po, and ikaw becomes kayo." },
          { tl: "Salamat po.", en: "Thank you (respectful).", why: "Polite, but it doesn't answer the question. Salamat is “thank you”." },
        ],
      },
      { who: "them", tl: "Mabuti naman. Kumain ka na?", en: "I'm fine. Have you eaten?" },
      {
        who: "you",
        prompt: "Say yes, and thank her.",
        options: [
          { tl: "Opo, salamat po.", en: "Yes, thank you (respectful).", correct: true, why: "opo is the respectful yes." },
          { tl: "Oo, salamat.", en: "Yes, thanks.", why: "oo is the casual yes. With an elder, use opo and add po." },
          { tl: "Hindi ko alam.", en: "I don't know.", why: "That means “I don't know”." },
        ],
      },
      { who: "them", tl: "Sige, ingat ka!", en: "Okay, take care!" },
      {
        who: "you",
        prompt: "Thank her respectfully. Type it.",
        accept: ["Salamat po", "Maraming salamat po", "Sige po, salamat po", "Opo, salamat po", "Salamat po, ingat po kayo", "Salamat po, ingat din po kayo"],
        model: "Salamat po.",
        modelEn: "Thank you (respectful).",
        why: "Salamat + po. Maraming salamat po works too.",
      },
    ],
  },
  {
    id: "d2",
    level: 2,
    title: "Meeting the family",
    partner: "Tita Malou",
    scene: "Your friend Carlo has brought you home for dinner. His mother, Tita Malou, greets you.",
    culture:
      "Accepting food is a way of accepting hospitality. If you really can't eat, soften it: “Busog pa po ako” (I'm still full) lands much better than a plain no.",
    turns: [
      { who: "them", tl: "Magandang gabi! Kumusta ka?", en: "Good evening! How are you?" },
      {
        who: "you",
        prompt: "Greet her and say you're fine.",
        options: [
          { tl: "Magandang gabi po. Mabuti naman po.", en: "Good evening. I'm fine. (respectful)", correct: true, why: "She's your friend's mother, so po throughout." },
          { tl: "Magandang gabi. Mabuti naman.", en: "Good evening. I'm fine.", why: "Correct words, but too casual for a friend's parent. Add po." },
          { tl: "Magandang umaga po. Mabuti naman po.", en: "Good morning. I'm fine. (respectful)", why: "umaga is morning. It's dinner time: gabi." },
        ],
      },
      { who: "them", tl: "Ito ang anak ko, si Ana.", en: "This is my daughter, Ana." },
      {
        who: "you",
        prompt: "Ana is about your age. Say hello to her.",
        options: [
          { tl: "Kumusta ka, Ana?", en: "How are you, Ana?", correct: true, why: "She's your own age, so ka and no po." },
          { tl: "Kumusta po kayo, Ana?", en: "How are you, Ana? (respectful)", why: "Not wrong, but po and kayo with someone your own age sounds stiff and distant." },
          { tl: "Salamat, Ana.", en: "Thanks, Ana.", why: "That thanks her. To greet: Kumusta ka?" },
        ],
      },
      { who: "them", tl: "Gutom ka na ba? Kain tayo!", en: "Are you hungry? Let's eat!" },
      {
        who: "you",
        prompt: "Say yes, you're hungry, and thank her.",
        options: [
          { tl: "Opo, gutom na po ako. Salamat po.", en: "Yes, I'm hungry. Thank you. (respectful)", correct: true, why: "opo, then gutom ako with po tucked in." },
          { tl: "Ayaw ko.", en: "I don't want to.", why: "This is a blunt refusal and would come across as rude here." },
          { tl: "Opo, pagod na po ako.", en: "Yes, I'm tired. (respectful)", why: "pagod is tired. Hungry is gutom." },
        ],
      },
      { who: "them", tl: "Gusto mo ng kape?", en: "Would you like coffee?" },
      {
        who: "you",
        prompt: "Say yes respectfully. Type it.",
        accept: ["Opo", "Opo, salamat po", "Sige po", "Sige po, salamat po", "Opo, gusto ko po", "Opo, gusto ko po ng kape", "Opo, salamat"],
        model: "Opo, salamat po.",
        modelEn: "Yes, thank you (respectful).",
        why: "opo is the respectful yes. Sige po (“okay”) also works.",
      },
      { who: "them", tl: "Masarap ba ang ulam?", en: "Is the food good?" },
      {
        who: "you",
        prompt: "Tell her it's delicious.",
        options: [
          { tl: "Opo, masarap po!", en: "Yes, it's delicious! (respectful)", correct: true, why: "masarap = delicious. The best thing you can say to the cook." },
          { tl: "Opo, masaya po!", en: "Yes, it's happy! (respectful)", why: "Easy to mix up: masaya is happy, masarap is delicious." },
          { tl: "Opo, busog po!", en: "Yes, full! (respectful)", why: "busog means you're full. She asked whether it tastes good: masarap." },
        ],
      },
    ],
  },
  {
    id: "d3",
    level: 3,
    title: "Getting to know Joy",
    partner: "Joy",
    scene: "At a family party you get talking to Joy, who is about your age. For this conversation, your name is Sam and you live in London.",
    culture:
      "Questions about your family come early in Filipino small talk. Having a few ready sentences about siblings and parents goes a long way.",
    turns: [
      { who: "them", tl: "Ano ang pangalan mo?", en: "What's your name?" },
      {
        who: "you",
        prompt: "Tell her you're Sam.",
        options: [
          { tl: "Ako si Sam.", en: "I'm Sam.", correct: true, why: "Names take si, including your own." },
          { tl: "Ako ang Sam.", en: "(I'm the Sam.)", why: "ang is for things. A person's name takes si." },
          { tl: "Siya si Sam.", en: "He/she is Sam.", why: "siya is he/she. “I” is ako." },
        ],
      },
      { who: "them", tl: "Taga-saan ka?", en: "Where are you from?" },
      {
        who: "you",
        prompt: "Say you're from London.",
        options: [
          { tl: "Taga-London ako.", en: "I'm from London.", correct: true, why: "taga- + place = from that place." },
          { tl: "Nasa London ako.", en: "I'm in London.", why: "nasa says where you are right now, not where you're from." },
          { tl: "Taga-London ka.", en: "You're from London.", why: "ka is “you”. “I” is ako." },
        ],
      },
      { who: "them", tl: "May kapatid ka ba?", en: "Do you have siblings?" },
      {
        who: "you",
        prompt: "Say yes, you have an older brother.",
        options: [
          { tl: "Oo, may kuya ako.", en: "Yes, I have an older brother.", correct: true, why: "may = have. With a friend your age, oo is fine." },
          { tl: "Oo, hindi ako kuya.", en: "Yes, I'm not an older brother.", why: "hindi means “not”. To say you have something, use may." },
          { tl: "Oo, wala akong kuya.", en: "Yes, I don't have an older brother.", why: "wala is the opposite of may: it says you don't have one." },
        ],
      },
      { who: "them", tl: "Mabait ba ang kuya mo?", en: "Is your brother kind?" },
      {
        who: "you",
        prompt: "Say yes, he's kind.",
        options: [
          { tl: "Oo, mabait siya.", en: "Yes, he's kind.", correct: true, why: "siya covers both he and she." },
          { tl: "Oo, mabait ako.", en: "Yes, I'm kind.", why: "ako is “I”. For “he”, use siya." },
          { tl: "Oo, mabait ka.", en: "Yes, you're kind.", why: "ka is “you”. For “he”, use siya." },
        ],
      },
      { who: "them", tl: "Malaki ba ang bahay mo sa London?", en: "Is your house in London big?" },
      {
        who: "you",
        prompt: "Say no, your house is small.",
        options: [
          { tl: "Hindi, maliit ang bahay ko.", en: "No, my house is small.", correct: true, why: "hindi answers “is it…?” questions. ko = my." },
          { tl: "Wala, maliit ang bahay ko.", en: "None, my house is small.", why: "wala means “there's none”. To say “no, it isn't”, use hindi." },
          { tl: "Hindi, maliit ang bahay mo.", en: "No, your house is small.", why: "mo is “your”. “My” is ko." },
        ],
      },
      { who: "them", tl: "Nasaan ang nanay mo ngayon?", en: "Where's your mother now?" },
      {
        who: "you",
        prompt: "Say she's at home. Type it.",
        accept: ["Nasa bahay siya", "Nasa bahay", "Nasa bahay siya ngayon", "Nasa bahay ang nanay ko"],
        model: "Nasa bahay siya.",
        modelEn: "She's at home.",
        why: "nasa + place, then siya.",
      },
    ],
  },
];
