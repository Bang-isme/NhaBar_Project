"use client";

import Image from "next/image";
import type { PromotionItem } from "@/lib/featured-event";
import { useLocale } from "@/components/LocaleProvider";

export function PromoCard({ promo }: { promo: PromotionItem }) {
  const { ui } = useLocale();
  const hasBanner = Boolean(promo.bannerUrl);

  return (
    <article className="promo-card promo-card--editorial hover-lift">
      <div className="promo-card__media">
        {hasBanner ? (
          <Image
            src={promo.bannerUrl!}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="promo-card__banner"
          />
        ) : (
          <div className="promo-card__poster" aria-hidden="true">
            <span className="promo-card__poster-mark">NHÀ</span>
            <span className="promo-card__poster-kicker">
              {ui.home.promoEyebrow}
            </span>
            <span className="promo-card__poster-title">{promo.title}</span>
          </div>
        )}
      </div>
      <div className="promo-card__body">
        {hasBanner ? (
          <>
            <span className="eyebrow">{ui.home.promoEyebrow}</span>
            <h2 className="promo-card__title">{promo.title}</h2>
          </>
        ) : (
          <h2 className="visually-hidden">{promo.title}</h2>
        )}
        {promo.description ? (
          <p className="promo-card__desc">{promo.description}</p>
        ) : null}
      </div>
    </article>
  );
}
