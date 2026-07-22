"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
};

function withKeys(nodes: ReactNode, suffix: string, hidden = false) {
  return Children.map(nodes, (child, index) => {
    if (!isValidElement(child)) return child;
    return cloneElement(
      child as ReactElement<{ key?: string; "aria-hidden"?: boolean }>,
      {
        key: `${suffix}-${index}`,
        ...(hidden ? { "aria-hidden": true } : {}),
      },
    );
  });
}

/**
 * Endless horizontal drift — gallery as atmosphere, not a static grid.
 * Pauses when the user hovers; respects prefers-reduced-motion.
 */
export function MarqueeGallery({
  children,
  className,
  duration = 36,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    setMotionOk(!prefersReducedMotion());
  }, []);

  useGSAP(
    () => {
      const el = track.current;
      const wrap = root.current;
      if (!el || !wrap || !motionOk) return;

      const half = el.scrollWidth / 2;
      if (half < 8) return;

      const tween = gsap.fromTo(
        el,
        { x: 0 },
        {
          x: -half,
          duration,
          ease: "none",
          repeat: -1,
        },
      );

      const pause = () => tween.pause();
      const play = () => tween.play();
      wrap.addEventListener("mouseenter", pause);
      wrap.addEventListener("mouseleave", play);
      wrap.addEventListener("focusin", pause);
      wrap.addEventListener("focusout", play);

      return () => {
        wrap.removeEventListener("mouseenter", pause);
        wrap.removeEventListener("mouseleave", play);
        wrap.removeEventListener("focusin", pause);
        wrap.removeEventListener("focusout", play);
      };
    },
    { scope: root, dependencies: [duration, children, motionOk] },
  );

  return (
    <div
      ref={root}
      className={`marquee-gallery${className ? ` ${className}` : ""}${
        motionOk ? "" : " marquee-gallery--static"
      }`}
    >
      <div ref={track} className="marquee-gallery__track">
        {withKeys(children, "a")}
        {motionOk ? withKeys(children, "b", true) : null}
      </div>
    </div>
  );
}
