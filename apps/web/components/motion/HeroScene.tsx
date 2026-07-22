"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const CARD_ROTATIONS = [-3.5, 2.5, 1];
/** Wait for header logo beat before hero details */
const HERO_INTRO_DELAY = 0.05;

type Props = {
  children: ReactNode;
};

export function HeroScene({ children }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const cards = Array.from(
        el.querySelectorAll<HTMLElement>("[data-hero-card]"),
      );

      cards.forEach((card) => {
        gsap.set(card, { rotate: 0, force3D: true });
      });

      const kicker = el.querySelectorAll("[data-hero='kicker']");
      const words = el.querySelectorAll("[data-hero-word]");
      const copy = el.querySelectorAll("[data-hero='copy']");
      const cta = el.querySelectorAll("[data-hero='cta']");
      const footer = el.querySelectorAll("[data-hero='footer']");

      if (prefersReducedMotion()) {
        gsap.set([kicker, words, copy, cta, cards, footer], {
          clearProps: "opacity,y",
          opacity: 1,
        });
        return;
      }

      gsap.set([kicker, words, copy, cta, footer], { opacity: 0, y: 14, force3D: true });
      gsap.set(cards, { opacity: 0, y: 20, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", force3D: true },
        delay: 0.05,
      });

      tl.to(kicker, { opacity: 1, y: 0, duration: 0.4 }, 0)
        .to(words, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 }, "-=0.22")
        .to(copy, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 }, "-=0.28")
        .to(cta, { opacity: 1, y: 0, duration: 0.35 }, "-=0.22")
        .to(cards, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .to(footer, { opacity: 1, y: 0, duration: 0.35 }, "-=0.4");
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="brand-hero-title">
      {children}
    </section>
  );
}
