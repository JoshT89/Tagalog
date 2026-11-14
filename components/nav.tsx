"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Repeat, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useNow } from "@/lib/clock";
import { dueCards } from "@/lib/progress";

const tabs = [
  { href: "/", label: "Today", icon: Home },
  { href: "/learn", label: "Lessons", icon: BookOpen },
  { href: "/review", label: "Review", icon: Repeat },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Nav() {
  const pathname = usePathname();
  const store = useStore();
  const now = useNow();
  const due = store ? dueCards(store, now).length : 0;
  // Hide the tab bar inside a lesson or conversation so nothing competes with the exercise.
  if (/^\/(learn|talk)\/.+/.test(pathname)) return null;
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-20 border-t-4 border-lattice bg-card">
      <ul className="mx-auto flex max-w-xl">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 py-2.5 text-sm font-medium",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.6 : 2} aria-hidden />
                {label}
                {active && <span className="absolute -top-1 h-1 w-10 bg-primary" aria-hidden />}
                {href === "/review" && due > 0 && (
                  <span className="absolute right-[22%] top-1.5 min-w-5 rounded-full bg-rosas px-1.5 text-center text-xs font-bold text-white dark:text-background">
                    {due}
                    <span className="sr-only"> cards due</span>
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
