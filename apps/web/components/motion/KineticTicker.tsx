"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

type Props = {
  items: readonly string[];
  embedded?: boolean;
};

export function KineticTicker({ items, embedded = false }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const loop = [...items, ...items];

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;

      const width = el.scrollWidth / 2;
      gsap.fromTo(
        el,
        { x: 0 },
        {
          x: -width,
          duration: embedded ? 32 : 28,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { dependencies: [items, embedded] },
  );

  return (
    <div
      className={`venue-ticker${embedded ? " venue-ticker--embedded" : ""}`}
      aria-hidden="true"
    >
      <div className="venue-ticker__track" ref={track}>
        {loop.map((item, i) => (
          <span className="venue-ticker__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
