"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatEventDate,
  formatEventDayParts,
  statusBadgeLabel,
  type EventListItem,
} from "@/lib/featured-event";
import { EventOfferStrip } from "@/components/EventOfferStrip";
import { useLocale } from "@/components/LocaleProvider";

export function EventCard({
  event,
  featured = false,
}: {
  event: EventListItem;
  featured?: boolean;
}) {
  const { locale } = useLocale();
  const dateParts = formatEventDayParts(event.startsAt, locale);
  const poster = event.posterUrl;

  return (
    <article
      className={`event-card event-card--editorial hover-lift${
        featured ? " event-card--featured" : ""
      }`}
    >
      <Link href={`/events/${event.slug}`} className="event-card__media">
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="event-card__poster"
          />
        ) : (
          <div className="event-card__poster event-card__poster--type" aria-hidden="true">
            <span className="event-card__poster-mark">NHÀ</span>
            <span className="event-card__poster-title">{event.title}</span>
          </div>
        )}
        <span className="date-block" aria-hidden="true">
          <span className="date-block__day">{dateParts.day}</span>
          <span className="date-block__month">{dateParts.month}</span>
        </span>
      </Link>
      <div className="event-card__body">
        <span className={`status-badge status-badge--${event.statusLabel}`}>
          {statusBadgeLabel(event.statusLabel, locale)}
        </span>
        <h2 className="event-card__title">
          <Link href={`/events/${event.slug}`}>{event.title}</Link>
        </h2>
        <p className="event-card__meta">
          {formatEventDate(event.startsAt, locale)}
        </p>
        {event.collaborator ? (
          <p className="event-card__collab">{event.collaborator}</p>
        ) : null}
        <EventOfferStrip offers={event.offers} compact />
      </div>
    </article>
  );
}
