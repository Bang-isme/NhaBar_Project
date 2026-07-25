"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocale } from "@/components/LocaleProvider";

const STATUS_MESSAGES = [
  "Khởi động không gian...",
  "Lên nhạc...",
  "Rót vị...",
  "Sẵn sàng đón khách...",
];

export function CreativeLoader() {
  const { ui } = useLocale();
  const [active, setActive] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const bladeTL = useRef<HTMLDivElement>(null);
  const bladeTR = useRef<HTMLDivElement>(null);
  const bladeBL = useRef<HTMLDivElement>(null);
  const bladeBR = useRef<HTMLDivElement>(null);
  const trackUpperRef = useRef<HTMLDivElement>(null);
  const trackLowerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // WCAG: Check preferences for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Prevent repeat animation during session
    const hasLoadedThisSession = sessionStorage.getItem("nha-bar-loaded");

    if (prefersReducedMotion || hasLoadedThisSession) {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      return;
    }

    setActive(true);
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const tl = gsap.timeline({
      onComplete: () => {
        const textTracks = [trackUpperRef.current, trackLowerRef.current];
        const grid = gridRef.current;
        const percentText = percentTextRef.current;
        const statusEl = statusRef.current;

        // Fade out overlay content first
        gsap.to([textTracks, grid, percentText, statusEl], {
          opacity: 0,
          scale: 0.9,
          duration: 0.45,
          ease: "power2.inOut",
          stagger: 0.05,
          onComplete: () => {
            // Camera Shutter Open: Slide 4 blades diagonally outwards
            gsap.timeline({
              onComplete: () => {
                setActive(false);
                sessionStorage.setItem("nha-bar-loaded", "true");
                document.body.style.overflow = "";
                document.body.style.touchAction = "";

                // WCAG 2.2 AA Focus Management
                const mainContent = document.getElementById("main-content");
                if (mainContent) {
                  mainContent.setAttribute("tabindex", "-1");
                  mainContent.focus();
                }
              }
            })
            .to(bladeTL.current, { xPercent: -100, yPercent: -100, duration: 0.75, ease: "power3.inOut" }, 0)
            .to(bladeTR.current, { xPercent: 100, yPercent: -100, duration: 0.75, ease: "power3.inOut" }, 0)
            .to(bladeBL.current, { xPercent: -100, yPercent: 100, duration: 0.75, ease: "power3.inOut" }, 0)
            .to(bladeBR.current, { xPercent: 100, yPercent: 100, duration: 0.75, ease: "power3.inOut" }, 0);
          }
        });
      },
    });

    // Initial State Settings
    tl.set([bladeTL.current, bladeTR.current, bladeBL.current, bladeBR.current], { xPercent: 0, yPercent: 0 });
    tl.set(trackUpperRef.current, { xPercent: -120 });
    tl.set(trackLowerRef.current, { xPercent: 120 });
    tl.set(gridRef.current?.children || [], { scale: 0, opacity: 0 });

    // Step 1: Text slides in from opposite directions
    tl.to(trackUpperRef.current, {
      xPercent: 0,
      duration: 1.1,
      ease: "power4.out",
    }, 0.2);
    tl.to(trackLowerRef.current, {
      xPercent: 0,
      duration: 1.1,
      ease: "power4.out",
    }, 0.2);

    // Step 2: Assemble Bento Grid Blocks sequentially
    tl.to(gridRef.current?.children || [], {
      scale: 1,
      opacity: 1,
      duration: 0.65,
      stagger: {
        each: 0.08,
        grid: [2, 3],
        from: "center",
      },
      ease: "back.out(1.7)",
    }, 0.5);

    // Step 3: Animate loading percentage from 0 to 100
    const progressObj = { value: 0 };
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 2.2,
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
      0.6
    );

    // Subtle breathing animation for grid blocks while loading
    tl.to(gridRef.current?.children || [], {
      y: -4,
      duration: 0.6,
      stagger: 0.05,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    }, 1.2);

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
      {/* 4 Camera Shutter Blades */}
      <div ref={bladeTL} className="creative-loader__blade creative-loader__blade--tl" />
      <div ref={bladeTR} className="creative-loader__blade creative-loader__blade--tr" />
      <div ref={bladeBL} className="creative-loader__blade creative-loader__blade--bl" />
      <div ref={bladeBR} className="creative-loader__blade creative-loader__blade--br" />

      {/* Decorative noise layer */}
      <div className="creative-loader__grain" />

      {/* Overlay contents */}
      <div className="creative-loader__overlay">
        {/* Bento assembly blocks */}
        <div ref={gridRef} className="creative-loader__grid" aria-hidden="true">
          <div className="creative-loader__block creative-loader__block--1" />
          <div className="creative-loader__block creative-loader__block--2" />
          <div className="creative-loader__block creative-loader__block--3" />
          <div className="creative-loader__block creative-loader__block--4" />
          <div className="creative-loader__block creative-loader__block--5" />
          <div className="creative-loader__block creative-loader__block--6" />
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
