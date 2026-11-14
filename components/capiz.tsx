import Link from "next/link";
import { Check, Lock, MessagesSquare } from "lucide-react";
import type { Level } from "@/content/types";
import { getDialogue } from "@/content";
import { isUnlocked } from "@/lib/progress";
import type { State } from "@/lib/store";
import { cn } from "@/lib/utils";

type PaneState = "done" | "next" | "open" | "locked" | "planned";

function paneState(kind: "lesson" | "dialogue", id: string, s: State, nextId?: string): PaneState {
  const done = kind === "lesson" ? !!s.lessons[id] : !!s.dialogues[id];
  if (done) return "done";
  if (!isUnlocked(kind, id, s)) return "locked";
  return id === nextId ? "next" : "open";
}

/** A level drawn as a capiz-shell window. Each pane is a lesson; finished panes glow. */
export function LevelWindow({ level, state, nextId }: { level: Level; state: State; nextId?: string }) {
  const dialogue = level.dialogueId ? getDialogue(level.dialogueId) : undefined;
  let n = 0;
  return (
    <div className="capiz grid-cols-2">
      {level.lessons.map((l) => (
        <Pane key={l.id} href={`/learn/${l.id}`} state={paneState("lesson", l.id, state, nextId)} label={`${++n}`} title={l.title} />
      ))}
      {(level.planned ?? []).map((t) => (
        <Pane key={t} state="planned" label={`${++n}`} title={t} />
      ))}
      {dialogue && (
        <Pane
          href={`/talk/${dialogue.id}`}
          state={paneState("dialogue", dialogue.id, state, nextId)}
          title={`Conversation: ${dialogue.title}`}
          wide={(level.lessons.length + (level.planned?.length ?? 0)) % 2 === 0}
          icon
        />
      )}
    </div>
  );
}

function Pane({ href, state, label, title, wide, icon }: { href?: string; state: PaneState; label?: string; title: string; wide?: boolean; icon?: boolean }) {
  const inner = (
    <>
      <span className="flex items-center justify-between text-sm font-semibold">
        {icon ? <MessagesSquare className="size-4" aria-hidden /> : <span>{label}</span>}
        {state === "done" && <Check className="size-4 text-leaf" aria-label="Finished" />}
        {state === "locked" && <Lock className="size-3.5" aria-label="Locked" />}
        {state === "planned" && <span className="font-normal">Coming later</span>}
      </span>
      <span className="mt-1 block font-display text-[1.05rem] font-semibold leading-tight">{title}</span>
    </>
  );
  const cls = cn(
    "pane block p-3",
    wide && "col-span-2",
    state === "done" && "pane-done",
    state === "next" && "pane-next",
    (state === "locked" || state === "planned") && "pane-locked",
  );
  if (!href || state === "locked" || state === "planned") return <div className={cls} aria-disabled>{inner}</div>;
  return <Link href={href} className={cn(cls, "hover:brightness-95 dark:hover:brightness-125")}>{inner}</Link>;
}

/** Tiny version for the dashboard: one square per lesson. */
export function MiniWindow({ level, state }: { level: Level; state: State }) {
  const panes = [
    ...level.lessons.map((l) => (state.lessons[l.id] ? "done" : "todo")),
    ...(level.planned ?? []).map(() => "planned"),
    ...(level.dialogueId ? [state.dialogues[level.dialogueId] ? "done" : "todo"] : []),
  ];
  return (
    <div className="capiz w-fit grid-flow-col auto-cols-[1.15rem] gap-[3px] p-[3px]" aria-hidden>
      {panes.map((p, i) => (
        <span key={i} className={cn("pane size-[1.15rem] min-h-0", p === "done" && "pane-done", p === "planned" && "pane-locked")} />
      ))}
    </div>
  );
}
