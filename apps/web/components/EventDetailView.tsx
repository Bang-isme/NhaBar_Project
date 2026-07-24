"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  formatEventDossierDate,
  statusBadgeLabel,
  type EventDetail,
} from "@/lib/featured-event";
import { EventOfferStrip } from "@/components/EventOfferStrip";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { VENUE } from "@/lib/venue";
import { IconArrowUpRight, IconArrowLeft } from "@/components/icons/AppIcons";

export function EventDetailView({ event }: { event: EventDetail }) {
  const { locale, ui } = useLocale();
  const initialPoster = event.posterUrl || "/uploads/hero/speakeasy-bar.png";
  const [posterSrc, setPosterSrc] = useState(initialPoster);

  return (
    <div className="page-screen">
      <div className="container stack-page">
        <article className="event-detail">
          <Reveal className="event-detail__poster-wrap">
            <div className="event-detail__poster">
              <Image
                src={posterSrc}
                alt={`${ui.posterAlt} ${event.title}`}
                width={800}
                height={1000}
                className="event-detail__poster-img"
                priority
                onError={() => setPosterSrc("/uploads/hero/speakeasy-bar.png")}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="event-detail__content">
              <div className="event-detail__meta-rail">
                <span className="section-label">{ui.eventDetail.label}</span>
                <span className={`status-badge status-badge--${event.statusLabel}`}>
                  {statusBadgeLabel(event.statusLabel, locale)}
                </span>
              </div>

              <h1 className="event-detail__title">{event.title}</h1>

              <div className="event-dossier-bar">
                <div className="event-dossier-item">
                  <svg className="event-dossier-item__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div className="event-dossier-item__copy">
                    <span className="event-dossier-item__label">{ui.eventDetail.when}</span>
                    <span className="event-dossier-item__val">
                      {formatEventDossierDate(event.startsAt, locale)}
                    </span>
                  </div>
                </div>

                <div className="event-dossier-item">
                  <svg className="event-dossier-item__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div className="event-dossier-item__copy">
                    <span className="event-dossier-item__label">{ui.eventDetail.where}</span>
                    <span className="event-dossier-item__val">{VENUE.addressCompact}</span>
                  </div>
                </div>

                {event.collaborator ? (
                  <div className="event-dossier-item">
                    <svg className="event-dossier-item__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div className="event-dossier-item__copy">
                      <span className="event-dossier-item__label">{ui.eventDetail.host}</span>
                      <span className="event-dossier-item__val">{event.collaborator}</span>
                    </div>
                  </div>
                ) : null}
              </div>

              {event.description ? (
                <p className="event-detail__desc">{event.description}</p>
              ) : null}

              {event.offers && event.offers.length > 0 ? (
                <section className="event-offers" aria-labelledby="offers-heading">
                  <div className="event-offers__head">
                    <h2 id="offers-heading" className="section-label">
                      {ui.eventDetail.offers}
                    </h2>
                    <Link
                      className="text-link event-offers__link"
                      href="/events#promotions"
                    >
                      {ui.home.allPromos}
                      <IconArrowUpRight size={13} className="text-link__icon" />
                    </Link>
                  </div>
                  <EventOfferStrip offers={event.offers} hideLabel />
                </section>
              ) : null}

              {event.lineup.length > 0 ? (
                <section className="lineup" aria-labelledby="lineup-heading">
                  <h2 id="lineup-heading" className="section-label">
                    {ui.eventDetail.lineup}
                  </h2>
                  <div className="lineup__rail">
                    {event.lineup.map((artist) => (
                      <div
                        key={`${artist.stageName}-${artist.roleLabel}`}
                        className="lineup__card"
                      >
                        <div className="lineup__avatar" aria-hidden="true">
                          {artist.stageName.charAt(0).toUpperCase()}
                        </div>
                        <div className="lineup__info">
                          <p className="lineup__name">{artist.stageName}</p>
                          <span className="lineup__role-badge">
                            {artist.roleLabel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {event.media.length > 0 ? (
                <section className="gallery" aria-labelledby="gallery-heading">
                  <h2 id="gallery-heading" className="section-label">
                    {ui.eventDetail.gallery}
                  </h2>
                  <div className="gallery__grid">
                    {event.media.map((item) => (
                      <div key={item.url} className="gallery__item">
                        <Image
                          src={item.url}
                          alt={item.altText || ""}
                          width={400}
                          height={300}
                          className="gallery__img"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="event-detail__footer">
                <Link className="text-link" href="/events">
                  {ui.eventDetail.back}
                </Link>
              </div>
            </div>
          </Reveal>
        </article>
      </div>
    </div>
  );
}
