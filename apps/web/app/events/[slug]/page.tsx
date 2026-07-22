import { notFound } from "next/navigation";
import { EventDetailView } from "@/components/EventDetailView";
import { getEventBySlug } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    return { title: "Không tìm thấy sự kiện — NHÀ Bar" };
  }
  return {
    title: `${event.title} — NHÀ Bar`,
    description: event.description ?? `Sự kiện tại NHÀ Bar: ${event.title}`,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="page-screen">
      <div className="container stack-page">
        <EventDetailView event={event} />
      </div>
    </div>
  );
}
