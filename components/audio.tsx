"use client";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { speak, useVoiceStatus } from "@/lib/speech";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Plays Tagalog text in a Filipino voice. Disabled (and says why) when there is no such voice. */
export function AudioButton({ text, className, label = "Play audio" }: { text: string; className?: string; label?: string }) {
  const status = useVoiceStatus();
  const slow = useStore()?.slowAudio ?? false;
  const ok = status === "ready";
  return (
    <button
      type="button"
      disabled={!ok}
      onClick={() => speak(text, slow)}
      title={ok ? label : "No Filipino voice on this browser"}
      aria-label={ok ? label : "Audio unavailable: no Filipino voice on this browser"}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-card text-foreground",
        "enabled:hover:bg-primary enabled:active:translate-y-px disabled:border-border disabled:text-muted-foreground",
        className,
      )}
    >
      {ok ? <Volume2 className="size-5" aria-hidden /> : <VolumeX className="size-5" aria-hidden />}
    </button>
  );
}

/** Shown once per page when the browser can't speak Filipino. */
export function VoiceBanner() {
  const status = useVoiceStatus();
  if (status === "ready" || status === "loading") return null;
  return (
    <div role="status" className="mb-4 rounded-md border-2 border-rosas bg-card p-3 text-sm">
      <p className="font-semibold">Audio is off: this browser has no Filipino voice.</p>
      <p className="mt-1 text-muted-foreground">
        An English voice would mispronounce Tagalog, so the app won&apos;t use one. Listening exercises are swapped for reading
        ones. <Link href="/settings" className="font-medium text-foreground underline">How to get a voice</Link>
      </p>
    </div>
  );
}
