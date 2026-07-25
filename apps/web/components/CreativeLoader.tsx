"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLocale } from "@/components/LocaleProvider";

const STATUS_MESSAGES = [
  "Khởi động không gian...",
  "Lên nhạc...",
  "Rót vị...",
  "Sẵn sàng đón khách...",
];

// Global in-memory flag. Resets on F5 refresh, but persists on client-side routing.
let hasLoadedThisSession = false;

export function CreativeLoader() {
  const { ui } = useLocale();
  const [active, setActive] = useState(!hasLoadedThisSession);
  const [percentage, setPercentage] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const bladeTL = useRef<HTMLDivElement>(null);
  const bladeTR = useRef<HTMLDivElement>(null);
  const bladeBL = useRef<HTMLDivElement>(null);
  const bladeBR = useRef<HTMLDivElement>(null);
  const trackUpperRef = useRef<HTMLDivElement>(null);
  const trackLowerRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const logoGlowRef = useRef<HTMLDivElement>(null);
  const equalizerRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check preferences for reduced motion (Accessibility)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || hasLoadedThisSession) {
      setActive(false);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      return;
    }

    // Freeze body scroll
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Guard check
    if (!bladeTL.current || !bladeTR.current || !bladeBL.current || !bladeBR.current) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        const textTracks = [trackUpperRef.current, trackLowerRef.current];
        const logoWrap = logoWrapRef.current;
        const equalizer = equalizerRef.current;
        const percentText = percentTextRef.current;
        const statusEl = statusRef.current;

        // Fade out overlay content
        gsap.to([logoWrap, equalizer, textTracks, percentText, statusEl], {
          opacity: 0,
          scale: 0.92,
          duration: 0.45,
          ease: "power2.inOut",
          stagger: 0.04,
          onComplete: () => {
            // Camera Shutter Open: Slide 4 blades diagonally outwards
            gsap.timeline({
              onComplete: () => {
                setActive(false);
                hasLoadedThisSession = true; // Mark as loaded for SPA routes
                document.body.style.overflow = "";
                document.body.style.touchAction = "";

                // Focus main-content for screen readers (WCAG 2.2 AA)
                const mainContent = document.getElementById("main-content");
                if (mainContent) {
                  mainContent.setAttribute("tabindex", "-1");
                  mainContent.focus();
                }
              }
            })
            .to(bladeTL.current, { xPercent: -100, yPercent: -100, duration: 0.8, ease: "power3.inOut" }, 0)
            .to(bladeTR.current, { xPercent: 100, yPercent: -100, duration: 0.8, ease: "power3.inOut" }, 0)
            .to(bladeBL.current, { xPercent: -100, yPercent: 100, duration: 0.8, ease: "power3.inOut" }, 0)
            .to(bladeBR.current, { xPercent: 100, yPercent: 100, duration: 0.8, ease: "power3.inOut" }, 0);
          }
        });
      },
    });

    // Reset positions
    tl.set([bladeTL.current, bladeTR.current, bladeBL.current, bladeBR.current], { xPercent: 0, yPercent: 0 });
    tl.set(trackUpperRef.current, { xPercent: -120 });
    tl.set(trackLowerRef.current, { xPercent: 120 });
    tl.set(logoWrapRef.current, { scale: 0.8, opacity: 0 });
    tl.set(equalizerRef.current, { opacity: 0 });

    // 1. Slide text from left & right
    tl.to([trackUpperRef.current, trackLowerRef.current], {
      xPercent: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.05,
    }, 0.2);

    // 2. Fade in and expand the Logo
    tl.to(logoWrapRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.95,
      ease: "back.out(1.5)",
    }, 0.4);

    // 3. Fade in Equalizer
    tl.to(equalizerRef.current, {
      opacity: 1,
      duration: 0.6,
    }, 0.6);

    // 4. Animate percentage count
    const progressObj = { value: 0 };
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 2.4,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.floor(progressObj.value);
          setPercentage(val);

          const msgIndex = Math.min(
            Math.floor((val / 100) * STATUS_MESSAGES.length),
            STATUS_MESSAGES.length - 1
          );
          setStatusText(STATUS_MESSAGES[msgIndex]);
        },
      },
      0.5
    );

    // 5. Breathing logo glow pulse
    gsap.to(logoGlowRef.current, {
      opacity: 0.28,
      scale: 1.18,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // 6. Audio Wave Equalizer animation
    const eqBars = equalizerRef.current?.children;
    if (eqBars) {
      Array.from(eqBars).forEach((bar) => {
        gsap.to(bar, {
          scaleY: Math.random() * 0.85 + 0.15,
          duration: Math.random() * 0.45 + 0.25,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    }

  }, []);

  useEffect(() => {
    if (!statusRef.current) return;
    gsap.fromTo(
      statusRef.current,
      { opacity: 0, y: 4 },
      { opacity: 0.85, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [statusText]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="creative-loader"
      role="status"
      aria-live="polite"
      aria-label="Đang tải trang web NHÀ Bar"
    >
      {/* 4 Shutter Blades (Camera opening effect) */}
      <div ref={bladeTL} className="creative-loader__blade creative-loader__blade--tl" />
      <div ref={bladeTR} className="creative-loader__blade creative-loader__blade--tr" />
      <div ref={bladeBL} className="creative-loader__blade creative-loader__blade--bl" />
      <div ref={bladeBR} className="creative-loader__blade creative-loader__blade--br" />

      {/* Noise filter */}
      <div className="creative-loader__grain" />

      {/* Overlay content */}
      <div className="creative-loader__overlay">
        {/* Central Logo Aperture Lens */}
        <div ref={logoWrapRef} className="creative-loader__logo-wrap">
          <div className="creative-loader__lens">
            <Image
              src="/logo-nha-bar-clean.png"
              alt="NHÀ Bar Logo"
              width={75}
              height={75}
              priority
            />
          </div>
          <div ref={logoGlowRef} className="creative-loader__logo-glow" />
        </div>

        {/* Music Wave Equalizer (12 high-end visualizer bars) */}
        <div ref={equalizerRef} className="creative-loader__equalizer" aria-hidden="true">
          <div className="creative-loader__eq-bar creative-loader__eq-bar--1" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--2" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--3" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--4" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--5" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--6" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--7" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--8" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--9" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--10" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--11" />
          <div className="creative-loader__eq-bar creative-loader__eq-bar--12" />
        </div>

        {/* Dual-Direction Sliding Text */}
        <div className="creative-loader__brand">
          <div className="creative-loader__track creative-loader__track--upper">
            <span ref={trackUpperRef} className="creative-loader__word creative-loader__word--nha">
              NHÀ
            </span>
          </div>
          <div className="creative-loader__track creative-loader__track--lower">
            <span ref={trackLowerRef} className="creative-loader__word creative-loader__word--bar">
              BAR
            </span>
          </div>
        </div>

        {/* Progress percent + status */}
        <div className="creative-loader__meta">
          <span ref={percentTextRef} className="creative-loader__percentage">
            {percentage}%
          </span>
          <span ref={statusRef} className="creative-loader__status">
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}
