"use client";

import type { EventOffer } from "@/lib/featured-event";
import { useLocale } from "@/components/LocaleProvider";
import { IconSpark } from "@/components/icons/AppIcons";

export function EventOfferStrip({
  offers,
  compact = false,
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

  if (compact) {
    return (
      <div className="event-offer-strip event-offer-strip--compact">
        {!hideLabel ? (
          <p className="event-offer-strip__label">{ui.featured.offerLabel}</p>
        ) : null}
        <div className="event-offer-pills">
          {offers.map((offer) => (
            <span key={offer.id} className="event-offer-pill">
              <span className="event-offer-pill__icon">
                <IconSpark size={12} />
              </span>
              <span className="event-offer-pill__title">{offer.title}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="event-offer-strip">
      {!hideLabel ? (
        <p className="event-offer-strip__label">{ui.featured.offerLabel}</p>
      ) : null}
      <div className="event-offer-bento">
        {offers.map((offer) => (
          <article key={offer.id} className="event-offer-card">
            <h4 className="event-offer-card__title">
              <span className="event-offer-card__icon" aria-hidden="true">
                <IconSpark size={13} />
              </span>
              <span className="event-offer-card__title-text">{offer.title}</span>
            </h4>
            {offer.description ? (
              <p className="event-offer-card__desc">{offer.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
