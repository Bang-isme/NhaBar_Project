"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Native-feel smooth scroll + section snap (proximity, not mandatory). */
export function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("has-smooth-scroll");
      return;
    }
    root.classList.add("has-smooth-scroll");
    return () => root.classList.remove("has-smooth-scroll");
  }, []);

  return null;
}
