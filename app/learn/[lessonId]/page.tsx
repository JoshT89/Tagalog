import { allLessons } from "@/content";
import { LessonClient } from "./lesson-client";

// Every lesson page is built ahead of time from the content files.
export function generateStaticParams() {
  return allLessons.map((l) => ({ lessonId: l.id }));
}

export default async function LessonPage({ params }: PageProps<"/learn/[lessonId]">) {
  const { lessonId } = await params;
  return <LessonClient lessonId={lessonId} />;
}
