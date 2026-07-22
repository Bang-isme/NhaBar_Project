"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
  className?: string;
};

/** Images scale 0.92 → 1 on enter; fade slightly as they leave. */
export function ScaleGallery({ children, className }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      const items = el.querySelectorAll("[data-scale-item]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 0.92, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 40%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
