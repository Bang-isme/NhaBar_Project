"use client";

import { VENUE } from "@/lib/venue";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";

const MAP_EMBED =
  "https://maps.google.com/maps?q=35%20Ng%C3%B5%20Th%C3%AC%20S%C4%A9%2C%20M%E1%BB%B9%20An%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng&t=&z=16&ie=UTF8&iwloc=&output=embed";

export function HomeWayfindSection() {
  const { ui } = useLocale();

  return (
    <section
      id="contact"
      className="home-wayfind-section section-frame"
      aria-labelledby="home-contact-title"
    >
      <Reveal className="section-head" mode="slide">
        <div className="section-head__copy">
          <h2 id="home-contact-title" className="section-title">
            {ui.contact.title}
          </h2>
          <p className="section-support">{ui.contact.lead}</p>
        </div>
      </Reveal>
      <div className="contact-grid contact-grid--wayfind">
        <Reveal className="contact-grid__map" delay={0.06}>
          <div className="map-panel map-panel--embed map-panel--wayfind">
            <iframe
              title={ui.contact.mapTitle}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
        <Reveal className="contact-grid__facts">
          <div className="contact-card contact-card--rail">
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
        </Reveal>
      </div>
    </section>
  );
}
