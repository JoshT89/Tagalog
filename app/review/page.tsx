"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { allItems, getItem } from "@/content";
import type { Item } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VoiceBanner } from "@/components/audio";
import { ExerciseView } from "@/components/exercise";
import { Loading, PlayerBar } from "@/components/player-chrome";
import { makeChoice, makeReview, shuffle, type Exercise } from "@/lib/exercises";
import { useNow } from "@/lib/clock";
import { dueCards } from "@/lib/progress";
import { useVoiceStatus } from "@/lib/speech";
import { actions, useStore, type State } from "@/lib/store";
import { cn } from "@/lib/utils";

const MAX_PER_SESSION = 20;
type Q = { ex: Exercise; retry?: boolean };

export default function ReviewPage() {
  const store = useStore();
  const [mode, setMode] = useState<"idle" | "review" | "speed">("idle");
  const now = useNow();
  if (!store) return <Loading />;
  if (mode === "review") return <Session store={store} onExit={() => setMode("idle")} />;
  if (mode === "speed") return <SpeedRound store={store} onExit={() => setMode("idle")} />;

  const due = dueCards(store, now).length;
  const total = Object.keys(store.cards).length;
  const upcoming = Object.values(store.cards)
    .filter((c) => c.due > now)
    .sort((a, b) => a.due - b.due)[0];

  return (
    <div>
      <h1 className="text-4xl font-extrabold">Review</h1>
      <p className="mt-2 text-muted-foreground">
        Words come back just before you&apos;d forget them. Get one right and the gap grows; miss it and it returns sooner.
      </p>
      <div className="mt-4"><VoiceBanner /></div>

      <section className="mt-2 rounded-md border-2 border-foreground bg-card p-4">
        {total === 0 ? (
          <>
            <h2 className="text-xl font-bold">Nothing to review yet</h2>
            <p className="mt-1 text-muted-foreground">Finish your first lesson and its words will show up here.</p>
            <Button asChild size="lg" className="mt-4 h-12 w-full text-base font-semibold">
              <Link href="/learn">Go to lessons</Link>
            </Button>
          </>
        ) : due > 0 ? (
          <>
            <h2 className="text-xl font-bold">
              {due} {due === 1 ? "card is" : "cards are"} due
            </h2>
            <p className="mt-1 text-muted-foreground">
              {due > MAX_PER_SESSION ? `You'll do ${MAX_PER_SESSION} now; the rest wait for the next session.` : `About ${Math.max(1, Math.round(due / 4))} minutes.`}
            </p>
            <Button size="lg" className="mt-4 h-14 w-full text-lg font-bold" onClick={() => setMode("review")}>
              Start review
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">All caught up</h2>
            <p className="mt-1 text-muted-foreground">
              {upcoming ? `Next review: ${new Date(upcoming.due).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}.` : "No reviews scheduled."}
            </p>
          </>
        )}
      </section>

      {total >= 4 && (
        <section className="mt-5 rounded-md bg-secondary p-4">
          <h2 className="text-xl font-bold">Speed round</h2>
          <p className="mt-1 text-muted-foreground">60 seconds on words you already know. Builds speed; doesn&apos;t change your review schedule.</p>
          <Button variant="outline" size="lg" className="mt-3 h-12 w-full border-2 border-foreground/80 text-base font-semibold" onClick={() => setMode("speed")}>
            Start speed round
          </Button>
        </section>
      )}
    </div>
  );
}

function Session({ store, onExit }: { store: State; onExit: () => void }) {
  const voice = useVoiceStatus();
  const [queue, setQueue] = useState<Q[]>(() =>
    dueCards(store, Date.now())
      .slice(0, MAX_PER_SESSION)
      .flatMap((c) => {
        const item = getItem(c.id);
        return item ? [{ ex: makeReview(item, c.reps, allItems, voice === "ready") }] : [];
      }),
  );
  const [idx, setIdx] = useState(0);
  const [right, setRight] = useState(0);
  const firstPass = queue.filter((q) => !q.retry).length;

  if (idx >= queue.length) {
    return (
      <div className="pop py-8">
        <h1 className="text-4xl font-extrabold">Review finished</h1>
        <p className="mt-4 font-display text-6xl font-extrabold">
          {right}
          <span className="text-3xl text-muted-foreground"> / {firstPass}</span>
        </p>
        <p className="mt-4 text-lg">right first time. Anything you missed will come back sooner.</p>
        <div className="mt-8 grid gap-3">
          <Button asChild size="lg" className="h-14 text-lg font-bold">
            <Link href="/">Back to today</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-12 border-2 border-foreground/80 text-base" onClick={onExit}>
            Review menu
          </Button>
        </div>
      </div>
    );
  }

  const q = queue[idx];
  return (
    <div>
      <PlayerBar value={(idx / queue.length) * 100} exitHref="/" label="Review progress" />
      {q.retry && <Badge variant="outline" className="mb-3 border-rosas text-rosas">One more try</Badge>}
      <ExerciseView
        key={idx}
        ex={q.ex}
        onDone={(r) => {
          if (!q.retry) {
            actions.grade(q.ex.item.id, r.quality);
            if (r.correct) setRight(right + 1);
          }
          // Missed: see it again at the end of this session, as an easier question.
          if (!r.correct && !q.retry) setQueue([...queue, { ex: makeChoice(q.ex.item, "tl-en", allItems), retry: true }]);
          setIdx(idx + 1);
        }}
      />
    </div>
  );
}

function SpeedRound({ store, onExit }: { store: State; onExit: () => void }) {
  const [pool] = useState<Item[]>(() => Object.keys(store.cards).flatMap((id) => getItem(id) ?? []));
  const make = () => makeChoice(shuffle(pool)[0], "tl-en", pool) as Extract<Exercise, { kind: "choice" }>;
  const [ex, setEx] = useState(make);
  const [left, setLeft] = useState(60);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  if (left === 0) {
    return (
      <div className="pop py-8">
        <h1 className="text-4xl font-extrabold">Time&apos;s up</h1>
        <p className="mt-4 font-display text-6xl font-extrabold">{score.right}</p>
        <p className="mt-2 text-lg">
          right out of {score.total} in 60 seconds.
        </p>
        <Button size="lg" className="mt-8 h-14 w-full text-lg font-bold" onClick={onExit}>
          Done
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button type="button" onClick={onExit} className="font-medium underline underline-offset-4">Stop</button>
        <p className="font-display text-2xl font-extrabold tabular-nums" aria-live="off">
          {left}s <span className="text-muted-foreground">· {score.right} right</span>
        </p>
      </div>
      <p className={cn("tl my-6 text-4xl", flash === "ok" && "text-leaf", flash === "no" && "text-destructive")}>{ex.item.tl}</p>
      <div className="grid gap-2.5">
        {ex.options.map((o) => (
          <button
            key={o}
            type="button"
            className="min-h-14 rounded-md border-2 border-foreground/80 bg-card px-4 py-3 text-left text-lg hover:bg-secondary active:translate-y-px"
            onClick={() => {
              const ok = o === ex.answer;
              setScore({ right: score.right + (ok ? 1 : 0), total: score.total + 1 });
              setFlash(ok ? "ok" : "no");
              setEx(make());
              setTimeout(() => setFlash(null), 250);
            }}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
