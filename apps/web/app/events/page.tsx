import { EventsView } from "@/components/EventsView";
import { getActivePromotions, getEvents } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sự kiện & Ưu đãi",
  description: "Lịch show, rap night, late session và các chương trình ưu đãi tại NHÀ Bar Đà Nẵng.",
};

export default async function EventsPage() {
  const [upcoming, past, promotions] = await Promise.all([
    getEvents("upcoming"),
    getEvents("past"),
    getActivePromotions(),
  ]);

  return <EventsView upcoming={upcoming} past={past} promotions={promotions} />;
}
