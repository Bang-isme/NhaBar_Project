"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Settle angle for lounge panel — depth, not decoration */
const PANEL_SETTLE = -1.6;

type Props = {
  children: ReactNode;
};

export function HeroScene({ children }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const panel = el.querySelector<HTMLElement>("[data-hero-card]");
      const panelMedia = el.querySelector<HTMLElement>("[data-hero-media]");
      const mark = el.querySelector<HTMLElement>("[data-hero-mark]");
      const markImg = mark?.querySelector<HTMLElement>("img") ?? null;
      const orbs = el.querySelectorAll<HTMLElement>("[data-hero-orb]");
      const kicker = el.querySelectorAll("[data-hero='kicker']");
      const brand = el.querySelectorAll("[data-hero='brand']");
      const words = el.querySelectorAll("[data-hero-word]");
      const copy = el.querySelectorAll("[data-hero='copy']");
      const cta = el.querySelectorAll("[data-hero='cta']");
      const footer = el.querySelectorAll("[data-hero='footer']");
      const visual = el.querySelectorAll("[data-hero='visual']");

      if (prefersReducedMotion()) {
        gsap.set(
          [kicker, brand, words, copy, cta, visual, footer, panel, mark],
          {
            clearProps: "opacity,y,x,rotate,scale,clipPath,filter",
            opacity: 1,
          },
        );
        return;
      }

      gsap.set([kicker, brand, words, copy, cta, footer], {
        opacity: 0,
        y: 18,
        force3D: true,
      });
      gsap.set(visual, {
        opacity: 0,
        y: 28,
        rotate: PANEL_SETTLE - 2.4,
        force3D: true,
      });
      if (panel) {
        gsap.set(panel, {
          clipPath: "inset(12% 8% 14% 8%)",
          force3D: true,
        });
      }
      if (panelMedia) {
        gsap.set(panelMedia, { scale: 1.12, force3D: true });
      }
      if (mark) {
        gsap.set(mark, { opacity: 0, scale: 1.08, force3D: true });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", force3D: true },
        delay: 0.08,
      });

      tl.to(kicker, { opacity: 1, y: 0, duration: 0.45 }, 0)
        .to(brand, { opacity: 1, y: 0, duration: 0.5 }, "-=0.28")
        .to(
          words,
          { opacity: 1, y: 0, stagger: 0.09, duration: 0.55 },
          "-=0.32",
        )
        .to(copy, { opacity: 1, y: 0, duration: 0.42 }, "-=0.3")
        .to(cta, { opacity: 1, y: 0, duration: 0.4 }, "-=0.24")
        .to(
          visual,
          { opacity: 1, y: 0, rotate: PANEL_SETTLE, duration: 0.75 },
          "-=0.55",
        );

      if (panel) {
        tl.to(
          panel,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85 },
          "-=0.7",
        );
      }
      if (panelMedia) {
        tl.to(panelMedia, { scale: 1, duration: 1.1, ease: "power2.out" }, "<");
      }
      if (mark) {
        tl.to(mark, { opacity: 1, scale: 1, duration: 1.2 }, "-=0.9");
      }
      tl.to(footer, { opacity: 1, y: 0, duration: 0.4 }, "-=0.55");

      /* Living lounge: soft orb drift + watermark breath */
      if (orbs.length) {
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            y: i % 2 === 0 ? 18 : -14,
            x: i % 2 === 0 ? -10 : 12,
            duration: 7 + i * 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }
      if (markImg) {
        gsap.to(markImg, {
          scale: 1.04,
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      /* Scroll depth — panel rises slower than copy (motivated depth) */
      if (panel) {
        gsap.to(panel, {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (mark) {
        gsap.to(mark, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="brand-hero-title">
      {children}
    </section>
  );
}
