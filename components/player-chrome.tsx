import Link from "next/link";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

/** Top bar for lessons, reviews and conversations: a way out and a progress bar. */
export function PlayerBar({ value, exitHref, label }: { value: number; exitHref: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <Link href={exitHref} aria-label="Leave" className="-ml-2 inline-flex size-11 items-center justify-center rounded-full hover:bg-secondary">
        <X className="size-5" aria-hidden />
      </Link>
      <Progress value={value} aria-label={label} className="h-3 rounded-sm bg-secondary [&>div]:bg-leaf" />
    </div>
  );
}

export function Loading() {
  return <p className="py-16 text-center text-muted-foreground">Loading your progress…</p>;
}
