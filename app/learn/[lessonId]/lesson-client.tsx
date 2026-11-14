"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { allLessons, getLesson, levelOfLesson, path } from "@/content";
import type { Item, Lesson, Teach } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AudioButton, VoiceBanner } from "@/components/audio";
import { ExerciseView } from "@/components/exercise";
import { Loading, PlayerBar } from "@/components/player-chrome";
import { makeChoice, makeListen, makeProduction, shuffle, type Exercise } from "@/lib/exercises";
import { hrefFor, isUnlocked } from "@/lib/progress";
import { speak, useVoiceStatus } from "@/lib/speech";
import { actions, useStore } from "@/lib/store";

type Step =
  | { t: "teach"; teach: Teach }
  | { t: "intro"; item: Item }
  | { t: "ex"; ex: Exercise; quiz?: boolean; retry?: boolean }
  | { t: "quizstart" };

const PASS = 0.8;

function buildQuiz(lesson: Lesson, earlier: Item[], pool: Item[], hasVoice: boolean): Step[] {
  const own = shuffle(lesson.items)
    .slice(0, 8)
    .map((item, i): Exercise => {
      if (i % 3 === 0) return makeChoice(item, "en-tl", pool);
      if (i % 3 === 1) return makeProduction(item, pool);
      return hasVoice ? makeListen(item, pool) : makeChoice(item, "tl-en", pool);
    });
  // Two questions from earlier lessons, so old material keeps getting mixed in.
  const old = shuffle(earlier)
    .slice(0, 2)
    .map((item) => makeChoice(item, "tl-en", pool));
  return shuffle([...own, ...old]).map((ex) => ({ t: "ex", ex, quiz: true }));
}

function buildSteps(lesson: Lesson, earlier: Item[], hasVoice: boolean): Step[] {
  const pool = [...lesson.items, ...earlier];
  const steps: Step[] = lesson.teach.map((teach) => ({ t: "teach", teach }));
  // Meet three items, then get tested on them straight away.
  for (let i = 0; i < lesson.items.length; i += 3) {
    const chunk = lesson.items.slice(i, i + 3);
    chunk.forEach((item) => steps.push({ t: "intro", item }));
    shuffle(chunk).forEach((item, k) =>
      steps.push({ t: "ex", ex: hasVoice && k % 2 === 1 ? makeListen(item, pool) : makeChoice(item, "tl-en", pool) }),
    );
    shuffle(chunk).forEach((item) => steps.push({ t: "ex", ex: makeChoice(item, "en-tl", pool) }));
  }
  // Then produce each one yourself.
  const mixed = shuffle(lesson.items);
  mixed.forEach((item) => steps.push({ t: "ex", ex: makeProduction(item, pool) }));
  mixed.slice(0, 2).forEach((item) => steps.push({ t: "ex", ex: { kind: "speak", item } }));
  steps.push({ t: "quizstart" }, ...buildQuiz(lesson, earlier, pool, hasVoice));
  return steps;
}

export function LessonClient({ lessonId }: { lessonId: string }) {
  const store = useStore();
  const lesson = getLesson(lessonId);
  if (!store) return <Loading />;
  if (!lesson)
    return (
      <Message title="That lesson doesn't exist">
        <Button asChild><Link href="/learn">Back to lessons</Link></Button>
      </Message>
    );
  if (!isUnlocked("lesson", lesson.id, store))
    return (
      <Message title="This lesson is still locked" body="Finish the one before it first.">
        <Button asChild><Link href="/learn">Back to lessons</Link></Button>
      </Message>
    );
  return <Player key={lesson.id} lesson={lesson} />;
}

function Message({ title, body, children }: { title: string; body?: string; children: React.ReactNode }) {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      {body && <p className="mt-2 text-muted-foreground">{body}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Player({ lesson }: { lesson: Lesson }) {
  const voice = useVoiceStatus();
  const level = levelOfLesson(lesson.id);
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [quiz, setQuiz] = useState({ right: 0, total: 0, missed: [] as string[] });
  const [finished, setFinished] = useState(false);

  const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const earlier = allLessons.slice(0, lessonIndex).flatMap((l) => l.items);
  const hasVoice = voice === "ready";

  if (!steps) {
    return (
      <div>
        <PlayerBar value={0} exitHref="/learn" label="Lesson progress" />
        <VoiceBanner />
        <p className="text-sm font-medium text-muted-foreground">Level {level?.id}: {level?.title}</p>
        <h1 className="mt-1 text-4xl font-extrabold">{lesson.title}</h1>
        <p className="mt-3 text-lg">{lesson.goal}</p>
        <p className="mt-6 text-muted-foreground">
          {lesson.items.length} new words and phrases, then a short quiz. About {Math.max(5, Math.round(lesson.items.length * 1.2))} minutes.
        </p>
        <Button size="lg" className="mt-8 h-14 w-full text-lg font-bold" onClick={() => setSteps(buildSteps(lesson, earlier, hasVoice))}>
          Start lesson
        </Button>
      </div>
    );
  }

  if (finished) return <Result lesson={lesson} quiz={quiz} onRetry={retryQuiz} />;

  const step = steps[idx];
  const next = () => {
    if (idx + 1 < steps.length) setIdx(idx + 1);
  };

  function retryQuiz() {
    const start = steps!.findIndex((s) => s.t === "quizstart");
    const pool = [...lesson.items, ...earlier];
    setSteps([...steps!.slice(0, start + 1), ...buildQuiz(lesson, earlier, pool, hasVoice)]);
    setQuiz({ right: 0, total: 0, missed: [] });
    setIdx(start);
    setFinished(false);
  }

  function onExercise(s: Extract<Step, { t: "ex" }>, correct: boolean) {
    if (s.quiz) {
      const q = { right: quiz.right + (correct ? 1 : 0), total: quiz.total + 1, missed: correct ? quiz.missed : [...quiz.missed, s.ex.item.id] };
      setQuiz(q);
      if (idx + 1 >= steps!.length) {
        const score = q.right / q.total;
        if (score >= PASS) actions.completeLesson(lesson.id, score, lesson.items.map((i) => i.id), q.missed);
        setFinished(true);
        return;
      }
    } else if (!correct && !s.retry) {
      // Got it wrong: it comes back a few steps later, before the quiz.
      const quizAt = steps!.findIndex((x) => x.t === "quizstart");
      const at = Math.min(idx + 4, quizAt);
      setSteps([...steps!.slice(0, at), { ...s, retry: true }, ...steps!.slice(at)]);
    }
    setIdx(idx + 1);
  }

  return (
    <div>
      <PlayerBar value={(idx / steps.length) * 100} exitHref="/learn" label="Lesson progress" />
      {step.t === "teach" && <TeachCard key={idx} teach={step.teach} onNext={next} />}
      {step.t === "intro" && <IntroCard key={idx} item={step.item} hasVoice={hasVoice} onNext={next} />}
      {step.t === "quizstart" && (
        <div className="pop py-8">
          <h2 className="text-3xl font-extrabold">Quiz time</h2>
          <p className="mt-3 text-lg">
            {steps.length - idx - 1} questions, a couple from earlier lessons. Get {Math.round(PASS * 100)}% to finish the lesson.
          </p>
          <Button size="lg" className="mt-8 h-14 w-full text-lg font-bold" onClick={next}>
            Start the quiz
          </Button>
        </div>
      )}
      {step.t === "ex" && (
        <div>
          {step.quiz && <Badge variant="outline" className="mb-3 border-foreground/60">Quiz</Badge>}
          {step.retry && <Badge variant="outline" className="mb-3 border-rosas text-rosas">One more try</Badge>}
          <ExerciseView key={idx} ex={step.ex} onDone={(r) => onExercise(step, r.correct)} />
        </div>
      )}
    </div>
  );
}

function TeachCard({ teach, onNext }: { teach: Teach; onNext: () => void }) {
  return (
    <div className="pop">
      <p className={teach.culture ? "text-sm font-semibold text-rosas" : "text-sm font-medium text-muted-foreground"}>
        {teach.culture ? "Culture note" : "How it works"}
      </p>
      <h2 className="mt-1 text-3xl font-extrabold">{teach.title}</h2>
      {teach.examples && (
        <ul className="mt-5 grid gap-3">
          {teach.examples.map((e) => (
            <li key={e.tl} className="flex items-center gap-3 border-l-4 border-primary pl-3">
              <div>
                <p className="tl text-2xl leading-snug">{e.tl}</p>
                <p className="text-muted-foreground">{e.en}</p>
              </div>
              {!/[→·+(]/.test(e.tl) && <AudioButton text={e.tl} className="ml-auto" />}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-5 text-lg leading-relaxed">{teach.body}</p>
      <Button size="lg" className="mt-8 h-12 w-full text-base font-semibold" onClick={onNext}>
        Got it
      </Button>
    </div>
  );
}

function IntroCard({ item, hasVoice, onNext }: { item: Item; hasVoice: boolean; onNext: () => void }) {
  useEffect(() => {
    if (hasVoice) speak(item.tl);
  }, [hasVoice, item.tl]);
  return (
    <div className="pop">
      <p className="text-sm font-medium text-muted-foreground">New</p>
      <div className="mt-4 flex items-center gap-4">
        <p className="tl text-5xl leading-[1.05]">{item.tl}</p>
        <AudioButton text={item.tl} className="size-14 bg-primary" />
      </div>
      {item.say && <p className="mt-2 text-muted-foreground">Say: {item.say}</p>}
      <p className="mt-5 text-2xl">{item.en}</p>
      {item.note && <p className="mt-3 border-l-4 border-rosas pl-3">{item.note}</p>}
      <p className="mt-6 text-muted-foreground">Say it aloud twice before you move on.</p>
      <Button size="lg" className="mt-4 h-12 w-full text-base font-semibold" onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

function Result({ lesson, quiz, onRetry }: { lesson: Lesson; quiz: { right: number; total: number; missed: string[] }; onRetry: () => void }) {
  const passed = quiz.right / quiz.total >= PASS;
  const i = path.findIndex((n) => n.kind === "lesson" && n.id === lesson.id);
  const nextUp = path[i + 1];
  return (
    <div className="pop py-6">
      <p className="text-sm font-medium text-muted-foreground">{lesson.title}</p>
      <h1 className="mt-1 text-4xl font-extrabold">{passed ? "Lesson finished" : "Not there yet"}</h1>
      <p className="mt-4 font-display text-6xl font-extrabold">
        {quiz.right}
        <span className="text-3xl text-muted-foreground"> / {quiz.total}</span>
      </p>
      {passed ? (
        <>
          <p className="mt-4 text-lg">
            {lesson.items.length} words and phrases are now in your review deck. They come back tomorrow
            {quiz.missed.length > 0 ? `, except the ${quiz.missed.length} you missed, which you can review today.` : "."}
          </p>
          <div className="mt-8 grid gap-3">
            {nextUp && (
              <Button asChild size="lg" className="h-14 text-lg font-bold">
                <Link href={hrefFor(nextUp)}>{nextUp.kind === "dialogue" ? "Go to the level conversation" : "Next lesson"}</Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="h-12 border-2 border-foreground/80 text-base">
              <Link href="/">Back to today</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-lg">You need {Math.round(PASS * 100)}% to finish. Have another go at the quiz, or redo the whole lesson first.</p>
          <div className="mt-8 grid gap-3">
            <Button size="lg" className="h-14 text-lg font-bold" onClick={onRetry}>
              Retake the quiz
            </Button>
            <Button variant="outline" size="lg" className="h-12 border-2 border-foreground/80 text-base" onClick={() => window.location.reload()}>
              Redo the lesson
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
