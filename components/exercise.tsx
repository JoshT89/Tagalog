"use client";
import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioButton } from "@/components/audio";
import { acceptedFor, matches, type Exercise } from "@/lib/exercises";
import { speak, useVoiceStatus } from "@/lib/speech";
import { cn } from "@/lib/utils";

type Result = { correct: boolean; quality: number };

const PROMPTS: Record<Exercise["kind"], string> = {
  choice: "",
  listen: "Listen. What does it mean?",
  tiles: "Build this in Tagalog",
  type: "Type this in Tagalog",
  speak: "Say this aloud in Tagalog",
};

export function ExerciseView({ ex, onDone }: { ex: Exercise; onDone: (r: Result) => void }) {
  const [result, setResult] = useState<Result | null>(null);
  const voice = useVoiceStatus();
  const { item } = ex;
  const showsTagalogFirst = ex.kind === "listen" || (ex.kind === "choice" && ex.dir === "tl-en");

  // Play the Tagalog when the question is shown (if the question is in Tagalog).
  useEffect(() => {
    if (showsTagalogFirst && voice === "ready") speak(item.tl);
  }, [showsTagalogFirst, voice, item.tl]);

  const finish = (correct: boolean, quality: number) => {
    setResult({ correct, quality });
    if (!showsTagalogFirst) speak(item.tl);
  };

  const prompt = ex.kind === "choice" ? (ex.dir === "tl-en" ? "What does this mean?" : "How do you say this?") : PROMPTS[ex.kind];

  return (
    <div className="pop">
      <p className="text-sm font-medium text-muted-foreground">{prompt}</p>

      {ex.kind === "listen" ? (
        <div className="my-6 flex items-center gap-4">
          <AudioButton text={item.tl} className="size-16 bg-primary" label="Play again" />
          {result && <p className="tl text-3xl">{item.tl}</p>}
        </div>
      ) : showsTagalogFirst ? (
        <div className="my-5 flex items-center gap-3">
          <p className="tl text-4xl leading-tight">{item.tl}</p>
          <AudioButton text={item.tl} />
        </div>
      ) : (
        <p className="my-5 font-display text-2xl font-semibold leading-snug">{item.en}</p>
      )}

      {(ex.kind === "choice" || ex.kind === "listen") && (
        <Choices options={ex.options} answer={ex.answer} tagalog={ex.kind === "choice" && ex.dir === "en-tl"} locked={!!result} onPick={(ok) => finish(ok, ok ? 4 : 2)} />
      )}
      {ex.kind === "tiles" && <Tiles ex={ex} locked={!!result} onCheck={(ok) => finish(ok, ok ? 4 : 2)} />}
      {ex.kind === "type" && <TypeIt accepted={acceptedFor(item)} locked={!!result} onCheck={(ok) => finish(ok, ok ? 5 : 2)} />}
      {ex.kind === "speak" && !result && <Speak tl={item.tl} say={item.say} onRate={(ok) => onDone({ correct: ok, quality: ok ? 4 : 2 })} />}

      {result && <Feedback result={result} tl={item.tl} en={item.en} note={item.note} onContinue={() => onDone(result)} />}
    </div>
  );
}

function Choices({ options, answer, tagalog, locked, onPick }: { options: string[]; answer: string; tagalog: boolean; locked: boolean; onPick: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="grid gap-2.5">
      {options.map((o) => {
        const isAnswer = o === answer;
        const isPicked = o === picked;
        return (
          <button
            key={o}
            type="button"
            disabled={locked}
            onClick={() => {
              setPicked(o);
              onPick(isAnswer);
            }}
            className={cn(
              "min-h-14 rounded-md border-2 border-foreground/80 bg-card px-4 py-3 text-left text-lg",
              "enabled:hover:bg-secondary enabled:active:translate-y-px",
              tagalog && "tl",
              locked && isAnswer && "border-leaf bg-leaf/15",
              locked && isPicked && !isAnswer && "border-destructive bg-destructive/10",
              locked && !isAnswer && !isPicked && "opacity-50",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Tiles({ ex, locked, onCheck }: { ex: Extract<Exercise, { kind: "tiles" }>; locked: boolean; onCheck: (ok: boolean) => void }) {
  const [chosen, setChosen] = useState<number[]>([]);
  const built = chosen.map((i) => ex.tiles[i]).join(" ");
  const tile = "tl min-h-11 rounded-md border-2 border-foreground/80 bg-card px-3.5 py-1.5 text-lg enabled:active:translate-y-px";
  return (
    <div>
      <div aria-label="Your sentence" className="mb-4 flex min-h-[4.25rem] flex-wrap content-start gap-2 border-b-2 border-dashed border-input pb-3">
        {chosen.length === 0 && <span className="self-center text-muted-foreground">Tap the words in order</span>}
        {chosen.map((i) => (
          <button key={i} type="button" disabled={locked} className={cn(tile, "bg-primary text-primary-foreground")} onClick={() => setChosen(chosen.filter((c) => c !== i))}>
            {ex.tiles[i]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {ex.tiles.map((t, i) => (
          <button key={i} type="button" disabled={locked || chosen.includes(i)} className={cn(tile, chosen.includes(i) && "opacity-25")} onClick={() => setChosen([...chosen, i])}>
            {t}
          </button>
        ))}
      </div>
      {!locked && (
        <Button size="lg" className="mt-6 h-12 w-full text-base font-semibold" disabled={chosen.length === 0} onClick={() => onCheck(matches(built, acceptedFor(ex.item)))}>
          Check
        </Button>
      )}
    </div>
  );
}

function TypeIt({ accepted, locked, onCheck }: { accepted: string[]; locked: boolean; onCheck: (ok: boolean) => void }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!locked && value.trim()) onCheck(matches(value, accepted));
      }}
    >
      <Input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        readOnly={locked}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        lang="tl"
        aria-label="Your answer in Tagalog"
        placeholder="Type in Tagalog"
        className="tl h-14 border-2 border-foreground/80 bg-card text-xl md:text-xl"
      />
      <p className="mt-2 text-sm text-muted-foreground">Capitals, punctuation and accent marks don&apos;t matter.</p>
      {!locked && (
        <Button type="submit" size="lg" className="mt-4 h-12 w-full text-base font-semibold" disabled={!value.trim()}>
          Check
        </Button>
      )}
    </form>
  );
}

function Speak({ tl, say, onRate }: { tl: string; say?: string; onRate: (ok: boolean) => void }) {
  const [shown, setShown] = useState(false);
  if (!shown)
    return (
      <div>
        <p className="mb-4 text-muted-foreground">Say it out loud first. Then check yourself.</p>
        <Button
          size="lg"
          className="h-12 w-full text-base font-semibold"
          onClick={() => {
            setShown(true);
            speak(tl);
          }}
        >
          Show the answer
        </Button>
      </div>
    );
  return (
    <div className="pop">
      <div className="flex items-center gap-3">
        <p className="tl text-3xl">{tl}</p>
        <AudioButton text={tl} />
      </div>
      {say && <p className="mt-1 text-muted-foreground">Say: {say}</p>}
      <p className="mt-5 font-medium">Did you say it right?</p>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <Button variant="outline" size="lg" className="h-12 border-2 border-foreground/80 text-base" onClick={() => onRate(false)}>
          Not yet
        </Button>
        <Button size="lg" className="h-12 text-base font-semibold" onClick={() => onRate(true)}>
          Yes
        </Button>
      </div>
    </div>
  );
}

function Feedback({ result, tl, en, note, onContinue }: { result: Result; tl: string; en: string; note?: string; onContinue: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const ok = result.correct;
  return (
    <div role="status" className={cn("pop mt-6 rounded-md border-2 p-4", ok ? "border-leaf bg-leaf/10" : "border-destructive bg-destructive/10")}>
      <p className={cn("flex items-center gap-2 font-display text-xl font-bold", ok ? "text-leaf" : "text-destructive")}>
        {ok ? <Check className="size-5" aria-hidden /> : <X className="size-5" aria-hidden />}
        {ok ? "Tama! Correct." : "Not quite."}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <div>
          <p className="tl text-xl">{tl}</p>
          <p className="text-muted-foreground">{en}</p>
        </div>
        <AudioButton text={tl} className="ml-auto" />
      </div>
      {note && <p className="mt-2 text-sm">{note}</p>}
      <Button ref={ref} size="lg" className="mt-4 h-12 w-full text-base font-semibold" onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}

