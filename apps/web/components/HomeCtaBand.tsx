"use client";

import { PrimaryButton } from "@/components/PrimaryButton";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { VENUE } from "@/lib/venue";

export function HomeCtaBand() {
  const { ui } = useLocale();

  return (
    <Reveal className="section-frame">
      <div className="bezel bezel--cta">
        <section className="bezel__core home-cta-band" aria-label="NHÀ Bar">
          <div className="home-cta-band__copy">
            <p className="section-label">{ui.cafeBarMyAn}</p>
            <h2 className="section-title">{VENUE.addressShort}</h2>
            <p className="section-support">{ui.home.ctaSupport}</p>
          </div>
          <div className="cta-row">
            <PrimaryButton href="/contact">{ui.directions}</PrimaryButton>
            <PrimaryButton href="/events" variant="ghost">
              {ui.home.eventSchedule}
            </PrimaryButton>
          </div>
        </section>
      </div>
    </Reveal>
  );
}
