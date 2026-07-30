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
          <span
            className="hero__orb hero__orb--bronze"
            data-hero-orb
          />
          <span className="hero__orb hero__orb--warm" data-hero-orb />
          <div className="hero__mark hero__mark--alive" data-hero-mark>
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
            <div className="reveal-mask">
              <div className="hero-editorial-kicker reveal-text" data-hero="kicker">
                <span className="hero-editorial-kicker__dot" aria-hidden="true" />
                <span className="hero-editorial-kicker__text">
                  CAFÉ & BAR · MỸ AN · {ui.venue.hoursLabel}
                </span>
              </div>
            </div>

            <div className="hero-brand" data-hero="brand">
              <Image
                src="/logo-nha-bar-clean.png"
                alt=""
                width={120}
                height={120}
                priority
                className="hero-brand__mark"
              />
              <h1
                id="brand-hero-title"
                className="hero-title hero-title--stamp"
              >
                <span className="reveal-mask">
                  <span data-hero-word className="hero-title__line reveal-text">
                    NHÀ
                  </span>
                </span>
                <span className="reveal-mask">
                  <span
                    data-hero-word
                    className="hero-title__line hero-title__accent reveal-text"
                  >
                    BAR
                  </span>
                </span>
              </h1>
            </div>

            <div className="reveal-mask" style={{ marginTop: '1.25rem' }}>
              <p className="hero-tagline reveal-text" data-hero="copy" style={{ margin: 0 }}>
                “{ui.venue.tagline}”
              </p>
            </div>

            <div className="cta-row" data-hero="cta">
              <PrimaryButton href="/events">{ui.hero.viewEvents}</PrimaryButton>
              <PrimaryButton href="/contact" variant="ghost">
                {ui.hero.visitVenue}
              </PrimaryButton>
            </div>
          </div>

          <div className="hero__visual hero__visual--lounge" data-hero="visual">
            <figure className="hero-lounge-panel" data-hero-card>
              <div className="hero-lounge-panel__media" data-hero-media>
                <Image
                  src="/uploads/hero/speakeasy-bar.png"
                  alt={ui.hero.scenes[0]}
                  width={900}
                  height={1100}
                  priority
                  className="hero-lounge-panel__img"
                />
              </div>
              <figcaption className="hero-lounge-panel__caption">
                <span className="hero-lounge-panel__kicker">
                  <span className="hero-soundwave" aria-hidden="true">
                    <span className="hero-soundwave__bar" />
                    <span className="hero-soundwave__bar" />
                    <span className="hero-soundwave__bar" />
                    <span className="hero-soundwave__bar" />
                  </span>
                  Mỹ An · Lounge
                </span>
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
