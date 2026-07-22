"use client";

import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { AutoRail } from "@/components/motion/AutoRail";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import type { EventListItem } from "@/lib/featured-event";

export function HomeUpcomingStrip({ events }: { events: EventListItem[] }) {
  const { ui } = useLocale();
  if (events.length === 0) return null;

  return (
    <section
      className="home-upcoming section-block section-frame"
      aria-labelledby="home-upcoming-heading"
    >
      <Reveal className="section-head section-head--row" mode="slide">
        <div className="section-head__copy">
          <h2 id="home-upcoming-heading" className="section-title">
            {ui.home.upcomingTitle}
            <sup className="section-title__count">{events.length}</sup>
          </h2>
          <p className="section-support">{ui.home.upcomingSupport}</p>
        </div>
        <Link className="text-link section-head__link" href="/events">
          {ui.home.allEvents}
          <span className="text-link__icon" aria-hidden="true">
            ↗
          </span>
        </Link>
      </Reveal>
      <AutoRail
        className="home-upcoming__rail"
        label={ui.home.upcomingTitle}
        intervalMs={5200}
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className="home-upcoming__slide"
            data-rail-item
            style={{ ["--rail-i" as string]: index }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </AutoRail>
    </section>
  );
}
