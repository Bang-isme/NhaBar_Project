"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatEventDate,
  formatEventDayLabel,
  formatEventDayParts,
  formatEventTime,
  statusBadgeLabel,
  type EventListItem,
} from "@/lib/featured-event";
import { EventOfferStrip } from "@/components/EventOfferStrip";
import { useLocale } from "@/components/LocaleProvider";

export function EventCard({
  event,
  featured = false,
  variant = "default",
}: {
  event: EventListItem;
  featured?: boolean;
  /** Home rail: poster-led night board with info guests scan first. */
  variant?: "default" | "nightboard";
}) {
  const { locale, ui } = useLocale();
  const dateParts = formatEventDayParts(event.startsAt, locale);
  const poster = event.posterUrl;
  const leadOffer = event.offers?.[0];
  const isNightboard = variant === "nightboard";

  if (isNightboard) {
    return (
      <article className="event-card event-card--nightboard">
        <Link
          href={`/events/${event.slug}`}
          className="event-card__nightboard"
          aria-label={`${event.title}. ${formatEventDate(event.startsAt, locale)}`}
        >
          <div className="event-card__media event-card__media--nightboard">
            {poster ? (
              <Image
                src={poster}
                alt=""
                fill
                sizes="(max-width: 900px) 85vw, 32vw"
                className="event-card__poster"
              />
            ) : (
              <div
                className="event-card__poster event-card__poster--type"
                aria-hidden="true"
              >
                <span className="event-card__poster-mark">NHÀ</span>
                <span className="event-card__poster-title">{event.title}</span>
              </div>
            )}
            <span className="date-block" aria-hidden="true">
              <span className="date-block__day">{dateParts.day}</span>
              <span className="date-block__month">{dateParts.month}</span>
            </span>
            <span
              className={`status-badge status-badge--${event.statusLabel} status-badge--on-media`}
            >
              {statusBadgeLabel(event.statusLabel, locale)}
            </span>
          </div>

          <div className="event-card__nightboard-body">
            <h3 className="event-card__title">{event.title}</h3>
            <p className="event-card__when">
              <span className="event-card__clock">
                {formatEventTime(event.startsAt, locale)}
              </span>
              <span className="event-card__when-sep" aria-hidden="true">
                ·
              </span>
              <span>{formatEventDayLabel(event.startsAt, locale)}</span>
            </p>
            {event.collaborator ? (
              <p className="event-card__who">
                <span className="event-card__who-label">{ui.eventDetail.lineup}</span>
                {event.collaborator}
              </p>
            ) : event.description ? (
              <p className="event-card__blurb">{event.description}</p>
            ) : (
              <p className="event-card__who event-card__who--muted">
                {ui.cafeBarMyAn}
              </p>
            )}
            {leadOffer ? (
              <p className="event-card__deal">
                <span className="event-card__deal-label">
                  {ui.featured.offerLabel}
                </span>
                {leadOffer.title}
              </p>
            ) : null}
            <span className="event-card__more">
              {ui.featured.details}
              <span aria-hidden="true"> ↗</span>
            </span>
          </div>
        </Link>
      </article>
    );
  }

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
          <div
            className="event-card__poster event-card__poster--type"
            aria-hidden="true"
          >
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
