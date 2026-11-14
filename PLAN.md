# Tagalog app: plan

Status: waiting for your OK. Nothing is built yet.

## 0. Assumptions to confirm

- **Goal:** your brief still had the placeholder (`[e.g. chat with family / travel / general interest]`). I've planned for everyday conversation with a lean towards family talk. Tell me if it's travel or something else and I'll reweight the vocabulary and Level 6 dialogues.
- **Time:** 10–15 minutes a day. Sessions are sized for about 12.
- **Honest expectation:** the US Foreign Service Institute puts Tagalog in its "hard" Category III, about 1,100 class hours to professional proficiency [1]. Fifteen minutes a day is roughly 90 hours a year. This app targets basic, real conversation, not fluency.

## 1. Learning principles (and what the research changed)

| # | Principle | Evidence | What the app does |
|---|-----------|----------|-------------------|
| 1 | **Spaced repetition** | A meta-analysis of 48 second-language experiments found a medium-to-large benefit from spacing; longer gaps beat shorter ones on delayed tests [2]. | SM-2-style scheduler with expanding intervals. Every word, phrase and sentence pattern is a card. |
| 2 | **Active recall** | A review of 10 study techniques rated practice testing and distributed practice highest; rereading and highlighting rated low [3]. | No "read and tap next" screens. Every item is tested within seconds of being shown. Exercises escalate: recognise, then choose, then build, then type. |
| 3 | **Mix grammar patterns once each is introduced** | Interleaving improved verb-conjugation learning; the best schedule was orderly alternation when studying, random mixing when practising [4][5]. | Each verb pattern gets its own lesson (your "one at a time"), then quizzes and review deliberately mix it with earlier patterns. This is the main change to your brief. |
| 4 | **Balance, not just flashcards** | Nation's "four strands": input, output, deliberate study and fluency practice should get roughly equal time; deliberate study should be no more than about a quarter [6]. | Flashcard-style study is capped. Every lesson includes listening, sentence building, and a mini-dialogue. Review includes a quick "speed round" of easy known items for fluency. |
| 5 | **High-frequency first, in sentences** | High-frequency vocabulary gives the most return and is worth teaching directly [7]. | Words are picked by everyday usefulness and always appear inside a real sentence, never as a bare list. |
| 6 | **Pronunciation taught explicitly, early** | Meta-analysis of 77 studies: pronunciation instruction works (moderate effect) [8]. | Level 1 starts with sounds. Stress and glottal stops are marked on screen while learning. |
| 7 | **Short sessions mixing review and new** | Follows from 1–3. | Daily session = due reviews first (capped), then one new lesson of 6–8 items, then a 60-second speed round. |

### What is specifically hard about Tagalog for English speakers

1. **Verb focus.** The verb's affix tells you which noun the sentence is "about". English has nothing like it [9]. Taught last-but-one (Level 4), one affix at a time, after you can already say useful things without it.
2. **Aspect, not tense.** Verbs mark completed / ongoing / not yet started rather than past / present / future [9]. Taught as three shapes of one verb, with the same six verbs reused throughout.
3. **Verb-first word order** and the **ang / ng / sa** markers [9]. Level 3, via tile-building exercises.
4. **Stress and glottal stops change meaning but aren't written** [10]. The app shows learner marks (e.g. *bása* vs *basâ*) during lessons; you never have to type them.
5. **Little particles** (na, pa, ba, naman, daw, kasi) have no neat English translation and sit in a fixed position [11]. Level 5, taught by contrast pairs ("Kumain ka na?" vs "Kumain ka pa?").
6. **Linkers** (na / -ng) joining describing words to nouns. Level 3.
7. **Spelling traps:** *ng* is said "nang", *mga* is said "manga". Level 1.

What's easy, and used to build confidence early: Latin alphabet, regular spelling, no tones, no grammatical gender, and many English and Spanish loanwords.

## 2. Curriculum

Lessons unlock in order. Each ends with a quiz (pass = 80%). Each level ends with a conversation you must complete.

**Level 1: Sounds and politeness** (built fully)
1. The five vowels, and why spelling is your friend
2. Tricky sounds: ng, mga, the glottal stop, stress
3. Greetings: Kumusta, Magandang umaga / hapon / gabi
4. Po and opo: respect built into the sentence
5. Salamat, pasensya na, walang anuman
6. Oo, hindi, and "I don't understand"
- Conversation: greeting an elder (includes *mano po* cultural note)

**Level 2: Core words** (built fully)
1. Pronouns 1: ako, ikaw / ka, siya
2. Pronouns 2: tayo vs kami (the two kinds of "we"), kayo, sila
3. Numbers 1–10, and when Spanish numbers are used instead (prices, time)
4. Family: nanay, tatay, kuya, ate, lolo, lola, tito, tita
5. Food and drink
6. Time words: ngayon, mamaya, bukas, kahapon
7. Everyday verbs as fixed phrases (gusto, ayaw, kailangan, may / wala)
- Conversation: meeting the family

**Level 3: Sentence building** (built fully)
1. Describing things: *Maganda ang bahay* (describing word first)
2. Ang, and si for names
3. Ng: "of" and possession
4. Sa: place and direction
5. Linkers na / -ng
6. Questions: ano, sino, saan, kailan, magkano, and ba
7. Saying no: hindi vs wala
- Conversation: describing your home and family

**Level 4: Verbs** (structure + first lesson)
1. mag- verbs, completed (nagluto) ← built
2. mag- ongoing and not-yet-started · 3. -um- verbs · 4. -in verbs (object focus) · 5. Choosing mag-/-um- vs -in · 6. Mixed practice

**Level 5: Little words** (structure + first lesson)
1. na and pa ← built
2. ba and position rules · 3. naman · 4. daw / raw · 5. kasi · 6. lang, din / rin

**Level 6: Real conversations** (structure + first lesson)
1. Introductions ← built
2. At the market · 3. Ordering food · 4. Directions · 5. Family chat · 6. Taglish: how people really talk

## 3. App structure

**Stack:** Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · localStorage only. No backend, no login, no paid APIs.

```
app/
  page.tsx                 Dashboard: today's session, streak, words learned, level progress
  learn/page.tsx           Level map with locked / unlocked lessons
  learn/[lessonId]/        Lesson player
  review/page.tsx          Spaced-repetition review + speed round
  talk/[dialogueId]/       Conversation practice
  settings/page.tsx        Theme, audio voice check, reset progress
components/
  exercises/               Flashcard, MultipleChoice, TypeAnswer, TileBuilder, ListenChoose
  ui/                      shadcn components
content/
  types.ts                 Item, Lesson, Level, Dialogue types
  levels/level-1.ts ...    Typed lesson data, no UI code
  dialogues/*.ts           Scripted conversations with per-choice feedback
lib/
  srs.ts                   SM-2 scheduler (pure functions, unit tested)
  session.ts               Builds today's mix of review + new
  speech.ts                fil-PH voice detection and playback
  storage.ts               Versioned localStorage
```

**Exercise types:** flashcard (self-rated) · multiple choice · type the answer (forgiving of capitals, punctuation and accent marks) · build the sentence from tiles · listen and choose.

**Conversations:** branching scripts. You pick or type a reply; every option carries a plain-English "why" (e.g. "Right word, but she's your elder: add *po*").

**Audio:** browser speech synthesis using a Filipino (fil-PH) voice only. If your browser has none, a clear banner says so and audio buttons are disabled; it never falls back to an English voice. Voice availability differs by browser and device, so the settings page has a test button.

**Speaking:** browser speech *recognition* for Filipino is patchy and sends audio to a third party, so I'm leaving it out. Speaking is done as "say it aloud, then reveal and rate yourself" prompts. Say if you want me to try recognition anyway.

**Design:** warm and specific rather than app-store generic. Direction: woven-mat (banig) patterning, warm paper and deep-green/terracotta palette, a serif for Tagalog text so it reads as the star of the screen. Mobile-first, light and dark.

## 4. Accuracy and limits

- Content is checked against *Essential Tagalog Grammar* (learningtagalog.com), Schachter & Otanes' *Tagalog Reference Grammar*, and tagalog.com's dictionary. Anything I can't confirm is left out.
- I'm not a native speaker. If your family speaks Tagalog, ten minutes of them skimming the lesson files would be worth more than any of my checks. The README will say how.
- **Docs:** you asked for Context7. It isn't connected to this chat (I've put a connect option in the conversation). If you'd rather not connect it, I'll read the current official docs at nextjs.org and ui.shadcn.com directly instead; same result.
- **Testing:** I'll build and click through a full lesson and a review session in my own environment. I can't hear your browser's voice from there, so the first thing to check on your side is the audio test button.
- You'll need Node.js installed on your computer to run it.

## Sources

1. US Dept of State, Foreign Language Training (archived): https://webarchive.library.unt.edu/web/20210105072258/https://www.state.gov/foreign-language-training
2. Kim & Webb (2022), *Language Learning* 72(1), meta-analysis of spaced practice in L2 learning: https://doi.org/10.1111/lang.12479
3. Dunlosky et al. (2013), *Psychological Science in the Public Interest* 14(1); summary: https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html
4. Pan et al. (2019), systematic and random interleaving for L2 grammar: https://sc-pan.github.io/pdf/PLPR_2019.pdf
5. Pan et al. (2024), interleaving and grammar skill learning: https://sc-pan.github.io/pdf/PRKL_2024.pdf
6. Nation, *Learning Vocabulary in Another Language* (four strands): https://assets.cambridge.org/97811076/23026/excerpt/9781107623026_excerpt.pdf
7. Schmitt & Schmitt, on high-frequency vocabulary: https://nottingham-repository.worktribe.com/OutputFile/734839
8. Saito & Plonsky (2019), cited in *Studies in Second Language Acquisition*: https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/optimizing-l2-phonetic-learning/1DF617B31C08FE04252E293B83481493
9. Tagalog grammar overview: https://en.wikipedia.org/wiki/Tagalog_grammar
10. Stress and glottal stops: https://blog.openl.io/tagalog
11. *Essential Tagalog Grammar*, enclitic words: https://learningtagalog.com/grammar/introduction.html
