"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { getDialogue, getLesson, levels } from "@/content";
import { Button } from "@/components/ui/button";
import { VoiceBanner } from "@/components/audio";
import { MiniWindow } from "@/components/capiz";
import { Loading } from "@/components/player-chrome";
import { dueCards, hrefFor, nextNode } from "@/lib/progress";
import { useNow } from "@/lib/clock";
import { startOfDay } from "@/lib/srs";
import { currentStreak, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function greeting(hour: number) {
  if (hour < 12) return { tl: "Magandang umaga!", en: "Good morning" };
  if (hour < 18) return { tl: "Magandang hapon!", en: "Good afternoon" };
  return { tl: "Magandang gabi!", en: "Good evening" };
}

export default function Dashboard() {
  const store = useStore();
  const now = useNow();
  if (!store) return <Loading />;
  const today = startOfDay(now);
  const hello = greeting(new Date(now).getHours());
  const due = dueCards(store, now).length;
  const next = nextNode(store);
  const words = Object.keys(store.cards).length;
  const streak = currentStreak(store, now);
  const studiedToday = store.streak.lastDay === today;
  const lessonToday =
    Object.values(store.lessons).some((l) => l.doneAt >= today) || Object.values(store.dialogues).some((d) => d.doneAt >= today);

  const nextTitle = next ? (next.kind === "lesson" ? getLesson(next.id)?.title : `Conversation: ${getDialogue(next.id)?.title}`) : null;
  const steps = [
    { label: due > 0 ? `Review ${due} ${due === 1 ? "card" : "cards"}` : words === 0 ? "Review (nothing yet)" : "Review: all caught up", href: "/review", done: due === 0, skip: words === 0 },
    { label: next ? `${next.kind === "lesson" ? "New lesson" : "Level conversation"}: ${nextTitle}` : "All lessons finished", href: next ? hrefFor(next) : "/learn", done: lessonToday || !next, skip: false },
  ];
  const first = steps.find((s) => !s.done && !s.skip);

  return (
    <div>
      <header>
        <p className="tl text-[2.75rem] font-extrabold leading-none sm:text-6xl">{hello.tl}</p>
        <p className="mt-2 text-muted-foreground">{hello.en}. About 12 minutes today.</p>
      </header>

      <div className="mt-5"><VoiceBanner /></div>

      <section aria-labelledby="today" className="mt-2 rounded-md border-2 border-foreground bg-card p-4">
        <h2 id="today" className="text-xl font-bold">Today&apos;s session</h2>
        <ol className="mt-3 grid gap-2">
          {steps.map((s, i) => (
            <li key={i}>
              <Link href={s.href} className={cn("flex items-center gap-3 rounded-sm py-1.5", s.done && "text-muted-foreground")}>
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
                    s.done && !s.skip ? "border-leaf bg-leaf text-background" : "border-foreground/70",
                  )}
                >
                  {s.done && !s.skip ? <Check className="size-4" aria-label="Done" /> : i + 1}
                </span>
                <span className="font-medium">{s.label}</span>
              </Link>
            </li>
          ))}
        </ol>
        {first ? (
          <Button asChild size="lg" className="mt-4 h-14 w-full text-lg font-bold">
            <Link href={first.href}>{studiedToday ? "Continue" : "Start"}</Link>
          </Button>
        ) : (
          <p className="mt-4 font-medium text-leaf">Done for today. Come back tomorrow, or do an extra lesson.</p>
        )}
      </section>

      <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
        {[
          { k: "Day streak", v: streak },
          { k: "Words learned", v: words },
          { k: "Due now", v: due },
        ].map((s) => (
          <div key={s.k} className="rounded-md bg-secondary px-2 py-3">
            <dd className="font-display text-3xl font-extrabold leading-none">{s.v}</dd>
            <dt className="mt-1 text-sm text-muted-foreground">{s.k}</dt>
          </div>
        ))}
      </dl>

      <section aria-labelledby="levels" className="mt-8">
        <div className="flex items-baseline justify-between">
          <h2 id="levels" className="text-xl font-bold">Levels</h2>
          <Link href="/learn" className="text-sm font-medium underline underline-offset-4">All lessons</Link>
        </div>
        <ul className="mt-3 grid gap-3">
          {levels.map((level) => (
            <li key={level.id} className="flex items-center justify-between gap-3">
              <span className="font-medium">
                <span className="text-muted-foreground">{level.id}</span> {level.title}
              </span>
              <MiniWindow level={level} state={store} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
