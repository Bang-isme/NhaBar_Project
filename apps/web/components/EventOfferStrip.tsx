"use client";

import Link from "next/link";
import type { EventOffer } from "@/lib/featured-event";
import { useLocale } from "@/components/LocaleProvider";

export function EventOfferStrip({
  offers,
  compact = false,
  showAllLink = false,
  hideLabel = false,
}: {
  offers?: EventOffer[] | null;
  compact?: boolean;
  showAllLink?: boolean;
  /** When a parent section already titles the offers block. */
  hideLabel?: boolean;
}) {
  const { ui } = useLocale();
  if (!offers?.length) return null;

  return (
    <div
      className={
        compact
          ? "event-offer-strip event-offer-strip--compact"
          : "event-offer-strip"
      }
    >
      {!hideLabel ? (
        <p className="event-offer-strip__label">{ui.featured.offerLabel}</p>
      ) : null}
      <ul className="event-offer-strip__list">
        {offers.map((offer) => (
          <li key={offer.id} className="event-offer-strip__item">
            <span className="event-offer-strip__title">{offer.title}</span>
            {!compact && offer.description ? (
              <span className="event-offer-strip__desc">{offer.description}</span>
            ) : null}
          </li>
        ))}
      </ul>
      {showAllLink ? (
        <Link className="text-link event-offer-strip__link" href="/promotions">
          {ui.home.allPromos}
          <span className="text-link__icon" aria-hidden="true">
            ↗
          </span>
        </Link>
      ) : null}
    </div>
  );
}
