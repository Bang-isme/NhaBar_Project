import { EventsView } from "@/components/EventsView";
import { getEvents } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sự kiện",
  description: "Lịch show, rap night và late session tại NHÀ Bar Đà Nẵng.",
};

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getEvents("upcoming"),
    getEvents("past"),
  ]);

  return <EventsView upcoming={upcoming} past={past} />;
}
