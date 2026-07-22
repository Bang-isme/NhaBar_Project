"use client";

import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PromoCard } from "@/components/PromoCard";
import { MarqueeGallery } from "@/components/motion/MarqueeGallery";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { MOCK_GALLERY } from "@/lib/mock-data";
import type { PromotionItem } from "@/lib/featured-event";
import { VENUE } from "@/lib/venue";

export function HomeLocalizedSections({
  promos,
}: {
  promos: PromotionItem[];
}) {
  const { ui } = useLocale();

  return (
    <>
      <section
        className="home-promo section-block section-frame"
        aria-labelledby="home-promo-heading"
      >
        <Reveal className="section-head section-head--row" mode="slide">
          <div className="section-head__copy">
            <h2 id="home-promo-heading" className="section-title">
              {ui.home.promoTitle}
            </h2>
            <p className="section-support">{ui.home.promoSupport}</p>
          </div>
          <Link className="text-link section-head__link" href="/promotions">
            {ui.home.allPromos}
            <span className="text-link__icon" aria-hidden="true">
              ↗
            </span>
          </Link>
        </Reveal>
        {promos.length > 0 ? (
          <div className="promo-bento promo-bento--home promo-bento--editorial">
            {promos.map((promo, index) => (
              <Reveal
                key={promo.id}
                className={index === 0 ? "promo-bento__lead" : undefined}
                delay={index * 0.08}
                mode={index === 0 ? "clip" : "rise"}
              >
                <PromoCard promo={promo} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="events-empty">
              <p className="events-empty__text">{ui.home.promoEmpty}</p>
              <div className="cta-row">
                <PrimaryButton href={VENUE.facebookUrl}>
                  {ui.promos.facebook}
                </PrimaryButton>
                <PrimaryButton href="/contact" variant="ghost">
                  {ui.promos.contact}
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      <section
        className="home-gallery section-block section-frame"
        aria-labelledby="gallery-home"
      >
        <Reveal className="section-head" mode="slide">
          <div className="section-head__copy">
            <h2 id="gallery-home" className="section-title">
              {ui.home.galleryTitle}
            </h2>
            <p className="section-support">{ui.home.gallerySupport}</p>
          </div>
        </Reveal>
        <MarqueeGallery className="home-gallery__marquee" duration={40}>
          {MOCK_GALLERY.map((shot, index) => (
            <figure
              key={`${shot.url}-${index}`}
              className="home-gallery__slide"
              data-scale-item
            >
              <div className="home-gallery__item home-gallery__item--stamp">
                <Image
                  src={shot.url}
                  alt={ui.home.galleryShots[index] ?? shot.alt}
                  width={720}
                  height={480}
                  className="home-gallery__img"
                />
                <figcaption>
                  {ui.home.galleryShots[index] ?? shot.alt}
                </figcaption>
              </div>
            </figure>
          ))}
        </MarqueeGallery>
      </section>
    </>
  );
}
