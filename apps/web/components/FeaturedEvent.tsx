"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatEventDate,
  formatEventDayParts,
  type FeaturedEventData,
} from "@/lib/featured-event";
import { EventOfferStrip } from "@/components/EventOfferStrip";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function FeaturedEvent({ event }: { event: FeaturedEventData }) {
  const { locale, ui } = useLocale();
  const poster = event.posterUrl ?? "/posters/late-session.svg";
  const dateParts = formatEventDayParts(event.startsAt, locale);

  return (
    <section className="featured section-block section-frame" aria-labelledby="featured-heading">
      <Reveal className="section-head" mode="slide">
        <div className="section-head__copy">
          <h2 id="featured-heading" className="section-title">
            {ui.featured.title}
          </h2>
          <p className="section-support">{ui.featured.support}</p>
        </div>
      </Reveal>
      <Reveal mode="clip">
        <div className="bezel">
          <article className="bezel__core featured-panel">
            <Link
              href={`/events/${event.slug}`}
              className="featured-panel__media"
            >
              <Image
                src={poster}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                className="featured-panel__poster"
                priority
              />
              <span className="featured-panel__mark" aria-hidden="true">
                NHÀ
              </span>
              <span className="date-block date-block--lg" aria-hidden="true">
                <span className="date-block__day">{dateParts.day}</span>
                <span className="date-block__month">{dateParts.month}</span>
              </span>
            </Link>
            <div className="featured-panel__copy">
              <h3 className="featured-title">
                <Link href={`/events/${event.slug}`}>{event.title}</Link>
              </h3>
              <p className="featured-meta">
                {formatEventDate(event.startsAt, locale)}
              </p>
              <p className="featured-blurb">{ui.featured.blurb}</p>
              <EventOfferStrip offers={event.offers} />
              <Link className="text-link" href={`/events/${event.slug}`}>
                {ui.featured.details}
                <span className="text-link__icon" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
