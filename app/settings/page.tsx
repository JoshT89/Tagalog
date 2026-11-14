"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/player-chrome";
import { speak, useVoiceStatus, voiceName } from "@/lib/speech";
import { actions, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const store = useStore();
  const voice = useVoiceStatus();
  const { theme, setTheme } = useTheme();
  const [confirming, setConfirming] = useState(false);
  if (!store) return <Loading />;

  const seg = (on: boolean) =>
    cn("h-11 flex-1 rounded-sm border-2 px-3 font-medium", on ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-card");

  return (
    <div>
      <h1 className="text-4xl font-extrabold">Settings</h1>

      <section className="mt-8" aria-labelledby="s-audio">
        <h2 id="s-audio" className="text-xl font-bold">Audio</h2>
        {voice === "ready" && (
          <>
            <p className="mt-1 text-muted-foreground">Using the Filipino voice “{voiceName()}” from your browser.</p>
            <div className="mt-3 flex gap-2">
              <button type="button" className={seg(!store.slowAudio)} onClick={() => actions.setSlowAudio(false)}>Normal speed</button>
              <button type="button" className={seg(store.slowAudio)} onClick={() => actions.setSlowAudio(true)}>Slow</button>
            </div>
            <Button variant="outline" className="mt-3 h-11 border-2 border-foreground/80" onClick={() => speak("Magandang umaga. Kumusta ka?", store.slowAudio)}>
              Play a test phrase
            </Button>
          </>
        )}
        {voice === "loading" && <p className="mt-1 text-muted-foreground">Looking for a Filipino voice…</p>}
        {(voice === "none" || voice === "unsupported") && (
          <div className="mt-2 rounded-md border-2 border-rosas bg-card p-3">
            <p className="font-semibold">
              {voice === "none" ? "This browser has no Filipino voice, so audio is off." : "This browser can't speak text aloud, so audio is off."}
            </p>
            <p className="mt-2 text-sm">
              The app only speaks Tagalog with a Filipino (fil-PH) voice. Voices come from your browser or your device, not from this app. Things to try, then reload:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm">
              <li>Open the app in a different browser. Microsoft Edge and Chrome on Android usually include a Filipino voice.</li>
              <li>Add Filipino under your device&apos;s language or text-to-speech settings.</li>
            </ul>
          </div>
        )}
      </section>

      <section className="mt-8" aria-labelledby="s-theme">
        <h2 id="s-theme" className="text-xl font-bold">Appearance</h2>
        <div className="mt-3 flex gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <button key={t} type="button" className={seg(theme === t)} onClick={() => setTheme(t)}>
              {t === "system" ? "Match device" : t === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="s-data">
        <h2 id="s-data" className="text-xl font-bold">Your progress</h2>
        <p className="mt-1 text-muted-foreground">
          Saved in this browser on this device only. Clearing your browser data, or using a different browser, starts you from zero.
        </p>
        {confirming ? (
          <div className="mt-3 rounded-md border-2 border-destructive p-3">
            <p className="font-semibold">Delete all progress? This can&apos;t be undone.</p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" className="h-11 flex-1 border-2 border-foreground/80" onClick={() => setConfirming(false)}>Keep my progress</Button>
              <Button
                variant="destructive"
                className="h-11 flex-1"
                onClick={() => {
                  actions.reset();
                  setConfirming(false);
                }}
              >
                Delete progress
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" className="mt-3 h-11 border-2 border-destructive text-destructive" onClick={() => setConfirming(true)}>
            Delete progress
          </Button>
        )}
      </section>
    </div>
  );
}
