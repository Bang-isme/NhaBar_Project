"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealMode = "rise" | "clip" | "slide";

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  once?: boolean;
  /** Editorial enter language — clip/slide feel more intentional than plain fade. */
  mode?: RevealMode;
};

export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  once = true,
  mode = "rise",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { clearProps: "all", opacity: 1, y: 0, x: 0 });
        el.classList.add("is-revealed");
        return;
      }

      const fromVars: gsap.TweenVars =
        mode === "clip"
          ? {
              opacity: 0,
              y: y * 0.4,
              clipPath: "inset(8% 4% 12% 4%)",
              force3D: true,
            }
          : mode === "slide"
            ? { opacity: 0, x: -20, y: 10, force3D: true }
            : { opacity: 0, y: 20, force3D: true };

      const toVars: gsap.TweenVars =
        mode === "clip"
          ? {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.6,
              delay,
              ease: "power2.out",
              force3D: true,
            }
          : mode === "slide"
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.55,
                delay,
                ease: "power2.out",
                force3D: true,
              }
            : {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay,
                ease: "power2.out",
                force3D: true,
              };

      gsap.fromTo(el, fromVars, {
        ...toVars,
        onStart: () => el.classList.add("is-revealed"),
        onComplete: () => {
          if (mode === "clip") {
            gsap.set(el, { clearProps: "clipPath" });
          }
        },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
          onLeaveBack: once
            ? undefined
            : () => {
                el.classList.remove("is-revealed");
              },
        },
      });
    },
    { scope: ref, dependencies: [y, delay, once, mode] },
  );

  return (
    <div ref={ref} className={className} data-reveal data-reveal-mode={mode}>
      {children}
    </div>
  );
}
