"use client";
import { useState } from "react";
import Link from "next/link";
import { getDialogue, path } from "@/content";
import type { Dialogue, Option, Turn } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioButton, VoiceBanner } from "@/components/audio";
import { Loading, PlayerBar } from "@/components/player-chrome";
import { matches, shuffle } from "@/lib/exercises";
import { hrefFor, isUnlocked } from "@/lib/progress";
import { speak } from "@/lib/speech";
import { actions, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TalkClient({ dialogueId }: { dialogueId: string }) {
  const store = useStore();
  const dialogue = getDialogue(dialogueId);
  if (!store) return <Loading />;
  if (!dialogue || !isUnlocked("dialogue", dialogue.id, store))
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">{dialogue ? "This conversation is still locked" : "That conversation doesn't exist"}</h1>
        {dialogue && <p className="mt-2 text-muted-foreground">Finish every lesson in Level {dialogue.level} first.</p>}
        <Button asChild className="mt-6"><Link href="/learn">Back to lessons</Link></Button>
      </div>
    );
  return <Conversation key={dialogue.id} dialogue={dialogue} />;
}

type Said = { who: "them" | "you"; tl: string; en: string };

function Conversation({ dialogue }: { dialogue: Dialogue }) {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [log, setLog] = useState<Said[]>([]);
  const [firstTry, setFirstTry] = useState(0);
  const yourTurns = dialogue.turns.filter((t) => t.who === "you").length;

  // Their lines are added to the log automatically until it's your turn.
  function advance(from: number, said: Said[]) {
    let i = from;
    const next = [...said];
    while (i < dialogue.turns.length && dialogue.turns[i].who === "them") {
      const t = dialogue.turns[i] as Extract<Turn, { who: "them" }>;
      next.push({ who: "them", tl: t.tl, en: t.en });
      i++;
    }
    const last = next[next.length - 1];
    if (last?.who === "them") speak(last.tl);
    setLog(next);
    setIdx(i);
    if (i >= dialogue.turns.length) actions.completeDialogue(dialogue.id);
  }

  if (!started) {
    return (
      <div>
        <PlayerBar value={0} exitHref="/learn" label="Conversation progress" />
        <VoiceBanner />
        <p className="text-sm font-medium text-muted-foreground">Level {dialogue.level} conversation</p>
        <h1 className="mt-1 text-4xl font-extrabold">{dialogue.title}</h1>
        <p className="mt-4 text-lg">{dialogue.scene}</p>
        <p className="mt-4 text-muted-foreground">Pick or type your replies. If one is wrong, you&apos;ll see why and can try again.</p>
        <Button
          size="lg"
          className="mt-8 h-14 w-full text-lg font-bold"
          onClick={() => {
            setStarted(true);
            advance(0, []);
          }}
        >
          Start talking
        </Button>
      </div>
    );
  }

  const turn = dialogue.turns[idx];
  const done = idx >= dialogue.turns.length;
  const i = path.findIndex((n) => n.kind === "dialogue" && n.id === dialogue.id);
  const nextUp = path[i + 1];

  return (
    <div>
      <PlayerBar value={(idx / dialogue.turns.length) * 100} exitHref="/learn" label="Conversation progress" />
      <ol className="grid gap-3" aria-label="Conversation so far">
        {log.map((l, k) => (
          <Bubble key={k} said={l} partner={dialogue.partner} />
        ))}
      </ol>

      {!done && turn.who === "you" && (
        <YourTurn
          key={idx}
          turn={turn}
          onSaid={(said, clean) => {
            if (clean) setFirstTry(firstTry + 1);
            advance(idx + 1, [...log, said]);
          }}
        />
      )}

      {done && (
        <div className="pop mt-8 border-t-4 border-lattice pt-6">
          <h2 className="text-3xl font-extrabold">Conversation finished</h2>
          <p className="mt-2 text-lg">
            {firstTry} of {yourTurns} replies right first time.
          </p>
          {dialogue.culture && (
            <p className="mt-4 border-l-4 border-rosas pl-3">
              <span className="font-semibold text-rosas">Culture note. </span>
              {dialogue.culture}
            </p>
          )}
          <div className="mt-6 grid gap-3">
            {nextUp && (
              <Button asChild size="lg" className="h-14 text-lg font-bold">
                <Link href={hrefFor(nextUp)}>Start the next level</Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="h-12 border-2 border-foreground/80 text-base">
              <Link href="/">Back to today</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Bubble({ said, partner }: { said: Said; partner: string }) {
  const [showEn, setShowEn] = useState(said.who === "you");
  const them = said.who === "them";
  return (
    <li className={cn("pop max-w-[88%] rounded-md border-2 p-3", them ? "border-foreground bg-card" : "ml-auto border-transparent bg-primary text-primary-foreground")}>
      <p className="text-sm font-semibold opacity-80">{them ? partner : "You"}</p>
      <div className="flex items-start gap-3">
        <p className="tl text-xl leading-snug">{said.tl}</p>
        {them && <AudioButton text={said.tl} className="ml-auto size-9" />}
      </div>
      {showEn ? (
        <p className="mt-1 text-sm opacity-80">{said.en}</p>
      ) : (
        <button type="button" className="mt-1 text-sm underline underline-offset-4" onClick={() => setShowEn(true)}>
          Show English
        </button>
      )}
    </li>
  );
}

function YourTurn({ turn, onSaid }: { turn: Extract<Turn, { who: "you" }>; onSaid: (said: Said, firstTry: boolean) => void }) {
  const [options] = useState<Option[]>(() => ("options" in turn ? shuffle(turn.options) : []));
  const [tried, setTried] = useState<string[]>([]);
  const [picked, setPicked] = useState<Option | null>(null);
  const [typed, setTyped] = useState("");
  const [typedState, setTypedState] = useState<"idle" | "wrong" | "right" | "shown">("idle");

  const box = "pop mt-6 border-t-4 border-lattice pt-5";

  if ("options" in turn) {
    return (
      <div className={box}>
        <p className="text-sm font-medium text-muted-foreground">Your turn</p>
        <p className="mt-1 text-xl font-semibold">{turn.prompt}</p>
        <div className="mt-4 grid gap-2.5">
          {options.map((o) => {
            const wrong = tried.includes(o.tl);
            const isPicked = picked?.tl === o.tl;
            return (
              <button
                key={o.tl}
                type="button"
                disabled={wrong || !!picked?.correct}
                onClick={() => {
                  setPicked(o);
                  if (!o.correct) setTried([...tried, o.tl]);
                }}
                className={cn(
                  "tl min-h-14 rounded-md border-2 border-foreground/80 bg-card px-4 py-3 text-left text-lg enabled:hover:bg-secondary",
                  isPicked && o.correct && "border-leaf bg-leaf/15",
                  wrong && "border-destructive/60 opacity-60",
                )}
              >
                {o.tl}
              </button>
            );
          })}
        </div>
        {picked && (
          <div role="status" className={cn("pop mt-4 rounded-md border-2 p-3", picked.correct ? "border-leaf bg-leaf/10" : "border-destructive bg-destructive/10")}>
            <p className={cn("font-display text-lg font-bold", picked.correct ? "text-leaf" : "text-destructive")}>
              {picked.correct ? "Tama! Correct." : "Not that one."}
            </p>
            <p className="text-sm text-muted-foreground">“{picked.tl}” = {picked.en}</p>
            <p className="mt-1">{picked.why}</p>
            {picked.correct ? (
              <Button autoFocus size="lg" className="mt-3 h-12 w-full text-base font-semibold" onClick={() => onSaid({ who: "you", tl: picked.tl, en: picked.en }, tried.length === 0)}>
                Continue
              </Button>
            ) : (
              <p className="mt-2 font-medium">Try another reply.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  const finished = typedState === "right" || typedState === "shown";
  return (
    <div className={box}>
      <p className="text-sm font-medium text-muted-foreground">Your turn</p>
      <p className="mt-1 text-xl font-semibold">{turn.prompt}</p>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (finished || !typed.trim()) return;
          if (matches(typed, turn.accept)) setTypedState("right");
          else {
            setTried([...tried, typed]);
            setTypedState(tried.length >= 1 ? "shown" : "wrong");
          }
        }}
      >
        <Input
          autoFocus
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          readOnly={finished}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          lang="tl"
          aria-label="Your reply in Tagalog"
          placeholder="Type in Tagalog"
          className="tl h-14 border-2 border-foreground/80 bg-card text-xl md:text-xl"
        />
        {!finished && (
          <Button type="submit" size="lg" className="mt-3 h-12 w-full text-base font-semibold" disabled={!typed.trim()}>
            Send
          </Button>
        )}
      </form>
      {typedState === "wrong" && (
        <p role="status" className="pop mt-3 rounded-md border-2 border-destructive bg-destructive/10 p-3">
          Not quite. Hint: {turn.why} Try once more.
        </p>
      )}
      {finished && (
        <div role="status" className={cn("pop mt-4 rounded-md border-2 p-3", typedState === "right" ? "border-leaf bg-leaf/10" : "border-destructive bg-destructive/10")}>
          <p className={cn("font-display text-lg font-bold", typedState === "right" ? "text-leaf" : "text-destructive")}>
            {typedState === "right" ? "Tama! Correct." : "Here's one good answer."}
          </p>
          <p className="tl mt-1 text-xl">{turn.model}</p>
          <p className="text-sm text-muted-foreground">{turn.modelEn}</p>
          <p className="mt-1">{turn.why}</p>
          <Button
            autoFocus
            size="lg"
            className="mt-3 h-12 w-full text-base font-semibold"
            onClick={() => onSaid({ who: "you", tl: typedState === "right" ? typed.trim() : turn.model, en: turn.modelEn }, typedState === "right" && tried.length === 0)}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
