"use client";
import { levels } from "@/content";
import { LevelWindow } from "@/components/capiz";
import { Loading } from "@/components/player-chrome";
import { nextNode } from "@/lib/progress";
import { useStore } from "@/lib/store";

export default function LearnPage() {
  const store = useStore();
  if (!store) return <Loading />;
  const next = nextNode(store);
  return (
    <div>
      <h1 className="text-4xl font-extrabold">Lessons</h1>
      <p className="mt-2 text-muted-foreground">Lessons open in order. Each level ends with a conversation.</p>
      {levels.map((level) => {
        const done = level.lessons.filter((l) => store.lessons[l.id]).length;
        return (
          <section key={level.id} className="mt-9" aria-labelledby={`level-${level.id}`}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 id={`level-${level.id}`} className="text-2xl font-bold">
                <span className="text-muted-foreground">{level.id}</span> {level.title}
              </h2>
              <p className="shrink-0 text-sm text-muted-foreground">
                {done} of {level.lessons.length + (level.planned?.length ?? 0)}
              </p>
            </div>
            <p className="mb-3 mt-1 text-muted-foreground">{level.blurb}</p>
            <LevelWindow level={level} state={store} nextId={next?.id} />
          </section>
        );
      })}
    </div>
  );
}
