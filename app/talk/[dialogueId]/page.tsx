import { dialogues } from "@/content";
import { TalkClient } from "./talk-client";

export function generateStaticParams() {
  return dialogues.map((d) => ({ dialogueId: d.id }));
}

export default async function TalkPage({ params }: PageProps<"/talk/[dialogueId]">) {
  const { dialogueId } = await params;
  return <TalkClient dialogueId={dialogueId} />;
}
