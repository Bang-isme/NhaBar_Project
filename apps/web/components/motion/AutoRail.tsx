"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Auto-advance interval; paused on hover / focus / reduced motion. */
  intervalMs?: number;
  /** Accessible label for the rail region. */
  label: string;
};

/**
 * Horizontal snap rail with intentional auto-advance —
 * chill bar energy without trapping the user (pause on interact).
 */
export function AutoRail({
  children,
  className,
  intervalMs = 4800,
  label,
}: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-rail-item]");
    setCount(items.length);
  }, []);

  const goTo = useCallback((next: number) => {
    const el = scroller.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-rail-item]");
    if (items.length === 0) return;
    const clamped = ((next % items.length) + items.length) % items.length;
    const target = items[clamped];
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setIndex(clamped);
  }, []);

  useEffect(() => {
    measure();
    const el = scroller.current;
    if (!el) return;

    const lastBest = { current: 0 };
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const items = el.querySelectorAll<HTMLElement>("[data-rail-item]");
        if (items.length === 0) return;
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        items.forEach((item, i) => {
          const center = item.offsetLeft - el.offsetLeft + item.offsetWidth / 2;
          const dist = Math.abs(center - mid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        if (lastBest.current !== best) {
          lastBest.current = best;
          setIndex(best);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure, children]);

  useEffect(() => {
    if (prefersReducedMotion() || count < 2) return;

    const id = window.setInterval(() => {
      if (paused.current) return;
      goTo(index + 1);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [count, goTo, index, intervalMs]);

  return (
    <div
      className={`auto-rail${className ? ` ${className}` : ""}`}
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={() => {
        paused.current = false;
      }}
    >
      <div
        ref={scroller}
        className="auto-rail__track"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </div>
      {count > 1 ? (
        <div className="auto-rail__dots" role="tablist" aria-label={label}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1} / ${count}`}
              className={`auto-rail__dot${i === index ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
