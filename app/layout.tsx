import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Tagalog, araw-araw",
  description: "Learn conversational Tagalog in short daily sessions.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full">
        <ThemeProvider>
          <main className="mx-auto w-full max-w-xl px-4 pb-28 pt-6">{children}</main>
          <Suspense fallback={null}>
            <Nav />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
