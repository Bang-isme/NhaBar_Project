"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatEventDate,
  statusBadgeLabel,
  type EventDetail,
} from "@/lib/featured-event";
import { PrimaryButton } from "@/components/PrimaryButton";
import { EventOfferStrip } from "@/components/EventOfferStrip";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { VENUE } from "@/lib/venue";

export function EventDetailView({ event }: { event: EventDetail }) {
  const { locale, ui } = useLocale();

  return (
    <article className="event-detail">
      <Reveal>
        <div className="event-detail__poster">
          {event.posterUrl ? (
            <Image
              src={event.posterUrl}
              alt={`${ui.posterAlt} ${event.title}`}
              width={800}
              height={1000}
              className="event-detail__poster-img"
              priority
            />
          ) : (
            <div
              className="event-card__poster event-card__poster--empty"
              aria-hidden="true"
            >
              NHÀ
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="event-detail__content">
          <p className="section-label">{ui.eventDetail.label}</p>
          <span className={`status-badge status-badge--${event.statusLabel}`}>
            {statusBadgeLabel(event.statusLabel, locale)}
          </span>
          <h1 className="event-detail__title">{event.title}</h1>
          {event.description ? (
            <p className="event-detail__desc">{event.description}</p>
          ) : null}

          <dl className="event-facts">
            <div className="event-facts__row">
              <dt>{ui.eventDetail.when}</dt>
              <dd>{formatEventDate(event.startsAt, locale)}</dd>
            </div>
            <div className="event-facts__row">
              <dt>{ui.eventDetail.where}</dt>
              <dd>{VENUE.addressShort}</dd>
            </div>
            {event.collaborator ? (
              <div className="event-facts__row">
                <dt>{ui.eventDetail.host}</dt>
                <dd>{event.collaborator}</dd>
              </div>
            ) : null}
          </dl>

          <div className="cta-row">
            <PrimaryButton href="/events">
              {ui.eventDetail.allEvents}
            </PrimaryButton>
            <PrimaryButton href="/contact" variant="ghost">
              {ui.eventDetail.visitVenue}
            </PrimaryButton>
          </div>

          {event.offers && event.offers.length > 0 ? (
            <section className="event-offers" aria-labelledby="offers-heading">
              <h2 id="offers-heading" className="section-label">
                {ui.eventDetail.offers}
              </h2>
              <EventOfferStrip offers={event.offers} showAllLink hideLabel />
            </section>
          ) : null}

          {event.lineup.length > 0 ? (
            <section className="lineup" aria-labelledby="lineup-heading">
              <h2 id="lineup-heading" className="section-label">
                {ui.eventDetail.lineup}
              </h2>
              <ul className="lineup__list">
                {event.lineup.map((artist) => (
                  <li key={`${artist.stageName}-${artist.roleLabel}`}>
                    <span className="lineup__name">{artist.stageName}</span>
                    <span className="lineup__role">{artist.roleLabel}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {event.media.length > 0 ? (
            <section className="gallery" aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="section-label">
                {ui.eventDetail.gallery}
              </h2>
              <div className="gallery__grid">
                {event.media.map((item) => (
                  <figure key={item.url} className="gallery__item">
                    <Image
                      src={item.url}
                      alt={item.altText ?? event.title}
                      width={600}
                      height={400}
                      className="gallery__img"
                    />
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <p className="event-detail__back">
            <Link href="/events">{ui.eventDetail.back}</Link>
          </p>
        </div>
      </Reveal>
    </article>
  );
}
