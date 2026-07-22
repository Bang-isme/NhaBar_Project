"use client";

import { PrimaryButton } from "@/components/PrimaryButton";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { VENUE } from "@/lib/venue";

export function HomeCtaBand() {
  const { ui } = useLocale();

  return (
    <Reveal className="section-frame" mode="clip">
      <section
        className="home-cta-band home-cta-band--stamp"
        aria-label="NHÀ Bar"
      >
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
    </Reveal>
  );
}
