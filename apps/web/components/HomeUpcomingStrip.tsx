"use client";

import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import type { EventListItem } from "@/lib/featured-event";

export function HomeUpcomingStrip({ events }: { events: EventListItem[] }) {
  const { ui } = useLocale();
  if (events.length === 0) return null;

  return (
    <section
      className="home-upcoming section-block section-frame section-frame--fit"
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

      <div className="home-upcoming__board">
        {events.map((event, index) => (
          <Reveal
            key={event.id}
            className="home-upcoming__cell"
            delay={index * 0.07}
            mode={index === 0 ? "clip" : "rise"}
          >
            <EventCard event={event} variant="nightboard" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
