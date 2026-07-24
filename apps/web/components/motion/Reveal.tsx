"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

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

  useEffect(() => {
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
          ? { opacity: 0, x: -24, y: 12, force3D: true }
          : { opacity: 0, y: 26, force3D: true };

    const toVars: gsap.TweenVars =
      mode === "clip"
        ? {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            delay,
            ease: "power2.out",
            force3D: true,
          }
        : mode === "slide"
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              delay,
              ease: "power2.out",
              force3D: true,
            }
          : {
              opacity: 1,
              y: 0,
              duration: 0.65,
              delay,
              ease: "power2.out",
              force3D: true,
            };

    gsap.set(el, fromVars);

    let hasRevealed = false;

    const revealElement = () => {
      if (hasRevealed && once) return;
      hasRevealed = true;

      gsap.to(el, {
        ...toVars,
        onStart: () => el.classList.add("is-revealed"),
        onComplete: () => {
          if (mode === "clip") {
            gsap.set(el, { clearProps: "clipPath" });
          }
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement();
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [y, delay, once, mode]);

  return (
    <div ref={ref} className={className} data-reveal data-reveal-mode={mode}>
      {children}
    </div>
  );
}


