"use client";

import { VENUE } from "@/lib/venue";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const MAP_EMBED =
  "https://maps.google.com/maps?q=35%20Ng%C3%B5%20Th%C3%AC%20S%C4%A9%2C%20M%E1%BB%B9%20An%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng&t=&z=16&ie=UTF8&iwloc=&output=embed";

export function ContactView() {
  const { ui } = useLocale();

  return (
    <div className="page-screen">
      <div className="container stack-page">
        <PageHero
          title={ui.contact.title}
          lead={ui.contact.lead}
          aside={
            <p className="page-hero__aside-text">
              {VENUE.addressShort}
              <span>{ui.venue.hoursLabel}</span>
            </p>
          }
        />

        <section className="contact-grid" aria-labelledby="contact-title">
          <Reveal>
            <div className="bezel">
              <div className="bezel__core contact-card" id="contact-title">
                <dl className="contact-dl">
                  <div>
                    <dt>{ui.contact.address}</dt>
                    <dd>{VENUE.address}</dd>
                  </div>
                  <div>
                    <dt>{ui.contact.hours}</dt>
                    <dd>{ui.venue.hoursLabel}</dd>
                  </div>
                  <div>
                    <dt>{ui.contact.vibe}</dt>
                    <dd>{ui.contact.vibeValue}</dd>
                  </div>
                </dl>
                <div className="cta-row contact-card__cta">
                  <PrimaryButton href={VENUE.mapsUrl}>
                    {ui.contact.openMaps}
                  </PrimaryButton>
                  <PrimaryButton href={VENUE.facebookUrl} variant="ghost">
                    {ui.contact.facebook}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bezel">
              <div className="bezel__core map-panel map-panel--embed">
                <iframe
                  title={ui.contact.mapTitle}
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <div className="bezel bezel--cta">
            <section
              className="bezel__core home-cta-band contact-cta-band"
              aria-label={ui.contact.bandLabel}
            >
              <div className="home-cta-band__copy">
                <p className="section-label">{ui.contact.bandLabel}</p>
                <h2 className="section-title">{ui.contact.bandTitle}</h2>
                <p className="section-support">{ui.contact.bandSupport}</p>
              </div>
              <div className="cta-row">
                <PrimaryButton href="/events">
                  {ui.contact.seeEvents}
                </PrimaryButton>
                <PrimaryButton href={VENUE.facebookUrl} variant="ghost">
                  {ui.contact.facebook}
                </PrimaryButton>
              </div>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
