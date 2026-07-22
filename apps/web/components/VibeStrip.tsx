"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function VibeStrip() {
  const { ui } = useLocale();

  return (
    <section className="vibe-bento section-block section-frame" aria-label={ui.vibe.title}>
      <Reveal className="section-head" mode="slide">
        <div className="section-head__copy">
          <h2 className="section-title">{ui.vibe.title}</h2>
          <p className="section-support">{ui.vibe.support}</p>
        </div>
      </Reveal>
      <div className="bezel">
        <div className="bezel__core vibe-bento__grid">
          {ui.vibe.pillars.map((pillar, index) => (
            <Reveal
              key={pillar.label}
              className={`vibe-tile vibe-tile--${index + 1}`}
              delay={index * 0.1}
            >
              <span className="vibe-tile__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="vibe-tile__rule" aria-hidden="true" />
              <p className="vibe-tile__label">{pillar.label}</p>
              <p className="vibe-tile__text">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
