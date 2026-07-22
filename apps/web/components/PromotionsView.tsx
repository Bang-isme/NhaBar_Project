"use client";

import { PromoCard } from "@/components/PromoCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useLocale } from "@/components/LocaleProvider";
import type { PromotionItem } from "@/lib/featured-event";
import { VENUE } from "@/lib/venue";

export function PromotionsView({
  promotions,
}: {
  promotions: PromotionItem[];
}) {
  const { ui } = useLocale();

  return (
    <div className="page-screen">
      <div className="container stack-page">
        <PageHero
          title={ui.promos.title}
          lead={ui.promos.lead}
          aside={
            <p className="page-hero__aside-text">
              {ui.promos.asideMain}
              <span>{ui.venue.hoursLabel}</span>
            </p>
          }
        />

        {promotions.length > 0 ? (
          <div className="promo-bento">
            {promotions.map((promo, index) => (
              <Reveal
                key={promo.id}
                className={index === 0 ? "promo-bento__lead" : undefined}
                delay={index * 0.07}
              >
                <PromoCard promo={promo} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="events-empty">
              <p className="events-empty__text">{ui.promos.empty}</p>
              <div className="cta-row">
                <PrimaryButton href="/contact">{ui.promos.contact}</PrimaryButton>
                <PrimaryButton href={VENUE.facebookUrl} variant="ghost">
                  {ui.promos.facebook}
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
