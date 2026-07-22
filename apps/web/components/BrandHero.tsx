"use client";

import { PrimaryButton } from "@/components/PrimaryButton";
import { HeroScene } from "@/components/motion/HeroScene";
import { VenueTicker } from "@/components/VenueTicker";
import { useLocale } from "@/components/LocaleProvider";
import { VENUE } from "@/lib/venue";
import Image from "next/image";
import Link from "next/link";

export function BrandHero() {
  const { ui } = useLocale();

  return (
    <HeroScene>
      <div className="hero__bleed hero__bleed--lounge">
        <div className="hero__atmosphere" aria-hidden="true">
          <span className="hero__orb hero__orb--bronze" />
          <span className="hero__orb hero__orb--warm" />
          <div className="hero__mark hero__mark--alive">
            <Image
              src="/logo-nha-bar-clean.png"
              alt=""
              width={720}
              height={720}
              priority
              className="hero__mark-img"
            />
          </div>
        </div>

        <div className="hero__stage hero__stage--lounge">
          <div className="hero__copy">
            <div className="hero-status-tag" data-hero="kicker">
              <span className="hero-status-tag__dot" aria-hidden="true" />
              <span className="hero-loc">{ui.hero.location}</span>
              <span className="hero-status-tag__sep" aria-hidden="true">•</span>
              <span className="hero-status-tag__hours">{ui.venue.hoursLabel}</span>
            </div>

            <div className="hero-brand" data-hero="title">
              <Image
                src="/logo-nha-bar-clean.png"
                alt=""
                width={120}
                height={120}
                priority
                className="hero-brand__mark"
              />
              <h1 id="brand-hero-title" className="hero-title hero-title--stamp">
                <span data-hero-word className="hero-title__line">
                  NHÀ
                </span>
                <span data-hero-word className="hero-title__line hero-title__accent">
                  BAR
                </span>
              </h1>
            </div>

            <p className="hero-tagline" data-hero="copy">
              “{ui.venue.tagline}”
            </p>

            <p className="hero-support" data-hero="copy">
              {ui.venue.supportLine}
            </p>

            <div className="cta-row" data-hero="cta">
              <PrimaryButton href="/events">{ui.hero.viewEvents}</PrimaryButton>
              <PrimaryButton href="/contact" variant="ghost">
                {ui.hero.visitVenue}
              </PrimaryButton>
            </div>
          </div>

          <div className="hero__visual hero__visual--lounge" data-hero="visual">
            <figure className="hero-lounge-panel" data-hero-card>
              <div className="hero-lounge-panel__badge" aria-hidden="true">
                <span className="hero-soundwave">
                  <span className="hero-soundwave__bar" />
                  <span className="hero-soundwave__bar" />
                  <span className="hero-soundwave__bar" />
                  <span className="hero-soundwave__bar" />
                </span>
                <span>Good Music & Cocktails</span>
              </div>
              <Image
                src="/uploads/gallery/warm-lights.svg"
                alt={ui.hero.scenes[0]}
                width={900}
                height={1100}
                priority
                className="hero-lounge-panel__img"
              />
              <figcaption className="hero-lounge-panel__caption">
                <span className="hero-lounge-panel__kicker">Mỹ An · Lounge</span>
                <span>{ui.hero.scenes[0]}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="hero__base hero__base--compact" data-hero="footer">
          <VenueTicker embedded />
          <div className="hero__facts">
            <p>
              <span>{VENUE.addressShort}</span>
            </p>
            <Link href="/contact" className="hero__facts-link">
              {ui.directions}
            </Link>
          </div>
        </div>
      </div>
    </HeroScene>
  );
}
