# Tagalog, araw-araw

A small web app for learning conversational Tagalog in about 12 minutes a day. Everything runs in your browser: no login, no server, no paid services. The reasoning behind the design is in `PLAN.md`.

## Run it

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To use it on your phone, keep `npm run dev` running, connect the phone to the same Wi-Fi, and open `http://<your computer's IP address>:3000`. Progress is saved per browser, so your phone and computer keep separate progress.

**First thing to check: audio.** Go to Settings and press "Play a test phrase". The app only speaks with a Filipino voice supplied by your browser or device. If there isn't one, it says so and turns audio off instead of using an English voice. If that happens, try another browser (Edge, or Chrome on Android) or add Filipino in your device's text-to-speech settings.

## How a day works

1. **Review** the cards that are due (spaced repetition, capped at 20).
2. **One new lesson**: short teaching cards, new words with instant practice, then a quiz. 80% passes.
3. Optional **speed round**: 60 seconds on words you know.

Lessons unlock in order. Each of Levels 1–3 ends with a conversation. Levels 4–6 have their first lesson; the rest are listed as "Coming later".

## What's where

```
content/            All lesson text. No UI code in here.
  types.ts          The shapes: Item, Lesson, Level, Dialogue
  levels/           One file per level
  dialogues.ts      The scripted conversations
  index.ts          The list of levels, and the unlock order
lib/
  srs.ts            The review scheduler (SM-2)
  exercises.ts      Turns items into exercises; checks typed answers
  store.ts          Saved progress (localStorage)
  speech.ts         Filipino voice detection and playback
  progress.ts       What's unlocked, what's due
app/                The screens: today, lessons, lesson player, review, conversations, settings
components/         Exercises, audio button, the level "window" grid, shadcn/ui parts
```

## Add a lesson

Open the level file, for example `content/levels/level-4.ts`, and add a `lesson(...)` to the `lessons` list:

```ts
lesson(
  "4-2",                                   // unique id: level-number
  "mag- verbs: happening now",             // title
  "Say what someone is doing.",            // one-line goal
  [
    {
      title: "Repeat the first syllable",
      examples: [{ tl: "nagluluto", en: "is cooking" }],   // examples first
      body: "Plain-English explanation goes here.",        // then explain
    },
    // add `culture: true` to make a card a culture note
  ],
  [
    // [Tagalog, English, optional extras]
    ["Nagluluto ako.", "I'm cooking."],
    ["nagluluto", "is cooking", { say: "nag-lu-LU-to'", note: "Usage note.", alt: ["other accepted spelling"] }],
  ],
),
```

Then delete that lesson's title from the level's `planned` list. Exercises, the quiz and review cards are generated from the items automatically. Three rules:

- Every English meaning in the app must be different (two items both meaning "Yes." would make a quiz question with two right answers). Add a qualifier like "(respectful)" if needed.
- Don't change an item's Tagalog text once you've studied it: the saved progress for it is keyed on that text.
- Keep lessons to 6–8 items.

**Add a conversation:** add an entry to `content/dialogues.ts`, and set `dialogueId` on the level. Each "you" turn is either `options` (exactly one with `correct: true`, and a `why` for every option) or a typed turn with an `accept` list.

**Add a level:** create `content/levels/level-7.ts`, and add it to the list in `content/index.ts`.

## Accuracy

The Tagalog was written carefully and kept to common, well-attested phrases, but it has not been reviewed by a native speaker. If someone in your life speaks Tagalog, ask them to skim `content/levels/` and `content/dialogues.ts`; the files are plain text and take about ten minutes to read. The sound guides (`say`) are the part most worth a second opinion.

## What was tested

Before handover, a real browser (Chrome) was driven through: a full lesson with deliberate wrong answers, a review session, a speed round, all six Level 1 lessons, the Level 1 conversation (wrong and right replies, typed reply), locked-lesson blocking, theme switching and progress reset. No console errors. `npm run lint` and `npm run build` pass.

Not tested: real Filipino audio. The test machine had no Filipino voice, so listening exercises were run with a silent stand-in voice. Check audio on your own device.

## Notes on the build

- Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, shadcn/ui (Button, Card, Progress, Badge, Input).
- The shadcn components were copied from the official shadcn-ui GitHub repository, because the shadcn registry website wasn't reachable from the build environment. On your machine `npx shadcn@latest add <component>` should work as normal; `components.json` is set up for it.
- Fonts (Bricolage Grotesque, Figtree) are bundled through npm, so the app works offline once installed.

## What I'd build next

1. The rest of Levels 4–6 (the titles are already on the lesson map).
2. A native-speaker review pass, then recorded audio for Level 1 so pronunciation doesn't depend on the device's voice.
3. Export and import of progress, so you can move between phone and computer.
4. A "words I keep missing" list built from the review data.
5. Listening-first conversations: hear the line, with the text hidden until you ask.
6. Installable offline version (PWA) for the phone home screen.
