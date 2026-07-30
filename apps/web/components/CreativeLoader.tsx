"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";

const STATUS_MESSAGES = [
  "Chuẩn bị không gian...",
  "Làm lạnh ly cocktail...",
  "Định lượng nguyên liệu...",
  "Pha chế hương vị...",
  "Trang trí hoàn thiện...",
  "Sẵn sàng phục vụ...",
];

let hasLoadedThisSession = false;

export function CreativeLoader() {
  const { ui } = useLocale();
  const [active, setActive] = useState(!hasLoadedThisSession);
  const [percentage, setPercentage] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const liquidLevelRef = useRef<SVGGElement>(null);
  const streamRef = useRef<SVGGElement>(null);
  const streamPathRef = useRef<SVGPathElement>(null);
  const streamMaskRef = useRef<SVGRectElement>(null);
  const glowRef = useRef<SVGEllipseElement>(null);
  const shakerRef = useRef<SVGGElement>(null);
  const shakerCapRef = useRef<SVGGElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  // Splash & Ripples Refs
  const ripple1Ref = useRef<SVGEllipseElement>(null);
  const ripple2Ref = useRef<SVGEllipseElement>(null);
  const droplet1Ref = useRef<SVGCircleElement>(null);
  const droplet2Ref = useRef<SVGCircleElement>(null);
  const droplet3Ref = useRef<SVGCircleElement>(null);

  // Decorative Elements Refs (5 Ice Cubes)
  const ice1Ref = useRef<SVGGElement>(null);
  const ice2Ref = useRef<SVGGElement>(null);
  const ice3Ref = useRef<SVGGElement>(null);
  const ice4Ref = useRef<SVGGElement>(null);
  const ice5Ref = useRef<SVGGElement>(null);
  const umbrellaRef = useRef<SVGGElement>(null);
  const strawRef = useRef<SVGGElement>(null);
  const frontWaveRef = useRef<SVGPathElement>(null);
  const citrusRef = useRef<SVGGElement>(null);
  const spoutRef = useRef<SVGGElement>(null);

  // SVG Glass paths
  const glassRimRef = useRef<SVGPathElement>(null);
  const glassLipRef = useRef<SVGLineElement>(null);
  const glassStemRef = useRef<SVGLineElement>(null);
  const glassBaseRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || hasLoadedThisSession) {
      setActive(false);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      // Dispatch event so main page elements can reveal immediately
      window.dispatchEvent(new Event("app-ready"));
      document.documentElement.classList.add("app-ready");
      return;
    }

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    if (!containerRef.current || !liquidLevelRef.current || !streamRef.current || !shakerRef.current || !glassRef.current || !flowRef.current || !shakerCapRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // --- Awwwards Exit Transition ---
        const exitTl = gsap.timeline({
          onComplete: () => {
            setActive(false);
            hasLoadedThisSession = true;
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
            const mainContent = document.getElementById("main-content");
            if (mainContent) {
              mainContent.setAttribute("tabindex", "-1");
              mainContent.focus();
            }
          }
        });

        // 1. Clean Exit: Fade and slide down the internal elements
        exitTl.to([brandRef.current, percentTextRef.current, statusRef.current], {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.05,
        }, 0);
        
        exitTl.to([glassRef.current, flowRef.current], {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.in",
        }, 0.1);

        // Hide bottom frames as well
        const frameBottom = document.querySelector(".creative-loader__frame-bottom");
        if (frameBottom) {
          exitTl.to(frameBottom, { opacity: 0, y: 20, duration: 0.5, ease: "power3.in" }, 0);
        }

        // 2. Curtain Reveal: Slide the whole dark container UP
        exitTl.to(containerRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "expo.inOut",
          onStart: () => {
            // Signal the main page to start its entrance animations!
            window.dispatchEvent(new Event("app-ready"));
            document.documentElement.classList.add("app-ready");
          }
        }, 0.7);
      },
    });

    // Reset initial positions via GSAP
    tl.set(liquidLevelRef.current, { y: 62 }); // Start at 62 (center=97, peak=91) right below the 90px mask
    tl.set(streamRef.current, { strokeDashoffset: 160, opacity: 0 });
    // Center pivot of shaker is (150px -30px)
    tl.set(shakerRef.current, { opacity: 0, scale: 0.85, x: 0, y: 0, rotation: 0, svgOrigin: "150 -30" });
    tl.set(shakerCapRef.current, { opacity: 1, y: 0, x: 0, rotation: 0, svgOrigin: "150 -75" });
    tl.set(spoutRef.current, { opacity: 0 }); // Hide spout while cap is on
    tl.set(flowRef.current, { opacity: 0, y: 15 });
    tl.set(glassRef.current, { opacity: 0, scale: 0.95 });
    tl.set(brandRef.current, { opacity: 0, y: 10 });

    tl.set([ripple1Ref.current, ripple2Ref.current, droplet1Ref.current, droplet2Ref.current, droplet3Ref.current], { opacity: 0 });

    // Reset 5 decorative ice cubes to offscreen starting states
    tl.set([ice1Ref.current, ice2Ref.current, ice3Ref.current, ice4Ref.current, ice5Ref.current], { transformOrigin: "50% 50%" });
    tl.set(ice1Ref.current, { y: -45, opacity: 0, rotation: 18 });
    tl.set(ice2Ref.current, { y: -45, opacity: 0, rotation: -22 });
    tl.set(ice3Ref.current, { y: -45, opacity: 0, rotation: 14 });
    tl.set(ice4Ref.current, { y: -45, opacity: 0, rotation: 32 });
    tl.set(ice5Ref.current, { y: -45, opacity: 0, rotation: -15 });

    tl.set(citrusRef.current, { scale: 0, rotation: 80, opacity: 0, svgOrigin: "134 38" });
    tl.set(umbrellaRef.current, { x: -91, y: -25, rotation: -25, opacity: 0, svgOrigin: "116 20" });
    tl.set(strawRef.current, { y: -35, x: -10, opacity: 0 });

    tl.to(flowRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.1);
    tl.to([glassRef.current, brandRef.current], { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.1 }, 0.3);

    // Step 1: Upright Shaker appears
    tl.to(shakerRef.current, { opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.4)" }, 0.5);

    const floatTween = gsap.to(shakerRef.current, {
      y: "-=3",
      rotation: "+=1.2",
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      paused: true,
    });
    tl.add(() => floatTween.play(), 1.15);

    // Step 2: Professional Bartender Shake (0.8s) before pouring
    // Vertical strong shake with very slight rotation for realism
    tl.to(shakerRef.current, {
      x: 0,
      y: 35,
      rotation: 2,
      duration: 0.1,
      yoyo: true,
      repeat: 7,
      ease: "power1.inOut",
      onStart: () => floatTween.pause()
    }, 1.3);

    // Step 3: Shaker tilts to a horizontal pouring angle (-110deg) and moves to upper right
    tl.to(shakerRef.current, {
      rotation: -110,
      x: 35,
      y: -30,
      duration: 1.0,
      ease: "power3.inOut",
    }, 2.1);

    // Step 4: Cap pops off and hovers (Up-Left to avoid stream)
    tl.set(spoutRef.current, { opacity: 1 }, 2.85); // Spout appears instantly
    tl.to(shakerCapRef.current, {
      y: 15,
      x: 45,
      opacity: 1,
      rotation: 60,
      duration: 0.5,
      ease: "power2.out"
    }, 2.85);

    // Cap floating loop while pouring
    const capFloatTween = gsap.to(shakerCapRef.current, {
      y: "-=3",
      rotation: "+=3",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      paused: true,
    });
    tl.add(() => capFloatTween.play(), 3.2);

    // Stream emerges (Mask reveals the fluid path elegantly)
    tl.set(streamRef.current, { opacity: 1 }, 3.0);
    tl.to(streamMaskRef.current, {
      height: 250,
      duration: 0.65,
      ease: "power2.in",
    }, 3.0);
    tl.to(glowRef.current, { opacity: 0.75, duration: 0.45, ease: "power2.inOut" }, 3.3);

    let animFrameId: number;
    const progressObj = { value: 0 };
    const liquidObj = { value: 0 };

    const updateFluidPhysics = () => {
      const val = liquidObj.value;
      const time = Date.now() * 0.001;

      // Exact mathematically synchronized collision detection!
      // Wave surface is a sine wave approximation of the bezier path.
      // Amplitude is 6px, Wavelength is 100px.
      const frontWaveX = (time * (100 / 2.4)) % 100;
      if (frontWaveRef.current) {
        gsap.set(frontWaveRef.current, { x: frontWaveX });
      }

      // We translate the center by riseY. Center goes from 97 down to 50.
      const liquidCenterY = 97 - (val / 100) * 47;
      const exactSurfaceY = liquidCenterY - 6 * Math.sin((78 - frontWaveX) / 100 * 2 * Math.PI);
      const streamBottomY = Math.min(86, exactSurfaceY);

      // --- DYNAMIC FLUID ANCHOR ---
      // Force stream to always precisely match Shaker's GSAP coordinates!
      if (streamPathRef.current && val > 0 && val < 100) {
        const currentRot = gsap.getProperty(shakerRef.current, "rotation") as number;
        const currentX = gsap.getProperty(shakerRef.current, "x") as number;
        const currentY = gsap.getProperty(shakerRef.current, "y") as number;
        const currentScale = (gsap.getProperty(shakerRef.current, "scale") as number) || 1.0;

        const angleRad = (currentRot * Math.PI) / 180;
        const cosA = Math.cos(angleRad);
        const sinA = Math.sin(angleRad);

        // Native spout center relative to pivot (150, -30) is at Y=-78. Distance dy = -48!
        // To match a realistic 3D pour, the stream should be narrower than the spout (radius 3 vs 8)
        const streamRadius = 3.5;
        const leftDx = -streamRadius * currentScale;
        const leftDy = -48 * currentScale;
        const rightDx = streamRadius * currentScale;
        const rightDy = -48 * currentScale;

        // Apply 2D Rotation Matrix
        const leftRotX = leftDx * cosA - leftDy * sinA;
        const leftRotY = leftDx * sinA + leftDy * cosA;
        const rightRotX = rightDx * cosA - rightDy * sinA;
        const rightRotY = rightDx * sinA + rightDy * cosA;

        // Global Coords
        const lStartX = 150 + currentX + leftRotX;
        const lStartY = -30 + currentY + leftRotY;
        const rStartX = 150 + currentX + rightRotX;
        const rStartY = -30 + currentY + rightRotY;

        // --- Parabolic Fluid Projectile Physics ---
        // Calculate the exact directional vector the spout is pointing towards
        const pourStrength = 55; // Velocity of water shooting out before gravity pulls it down
        const shootX = Math.sin(angleRad) * pourStrength;
        const shootY = -Math.cos(angleRad) * pourStrength;

        const wobbleX = Math.sin(time * 22) * 1.4;
        const wobbleY = Math.cos(time * 22) * 0.8;

        // Draw perfect 3D connection! Narrow stream originating from inside the spout ellipse.
        // The Bezier curve uses the shoot vector for the top control point, and a straight vertical vector for the bottom control point (gravity).
        const streamPathD = `M${rStartX},${rStartY} C${rStartX + shootX + wobbleX},${rStartY + shootY + wobbleY} 76,${streamBottomY - 45} 76,${streamBottomY} L80,${streamBottomY} C80,${streamBottomY - 45} ${lStartX + shootX + wobbleX},${lStartY + shootY + wobbleY} ${lStartX},${lStartY} A ${streamRadius*currentScale} ${1.2*currentScale} ${currentRot} 0 0 ${rStartX},${rStartY}`;
        streamPathRef.current.setAttribute("d", streamPathD);
      }

      if (val > 2 && val < 94) {
        const r1Scale = (time * 2.5) % 1;
        const r2Scale = ((time * 2.5) + 0.5) % 1;
        
        if (ripple1Ref.current) {
          ripple1Ref.current.setAttribute("cx", "78");
          ripple1Ref.current.setAttribute("cy", streamBottomY.toString());
          ripple1Ref.current.setAttribute("rx", (r1Scale * 24).toString());
          ripple1Ref.current.setAttribute("ry", (r1Scale * 6).toString());
          ripple1Ref.current.style.opacity = (0.7 * (1 - r1Scale)).toString();
        }

        if (ripple2Ref.current) {
          ripple2Ref.current.setAttribute("cx", "78");
          ripple2Ref.current.setAttribute("cy", streamBottomY.toString());
          ripple2Ref.current.setAttribute("rx", (r2Scale * 24).toString());
          ripple2Ref.current.setAttribute("ry", (r2Scale * 6).toString());
          ripple2Ref.current.style.opacity = (0.7 * (1 - r2Scale)).toString();
        }

        const drop1Y = streamBottomY - Math.abs(Math.sin(time * 18) * 16);
        const drop2Y = streamBottomY - Math.abs(Math.cos(time * 14) * 12);
        const drop3Y = streamBottomY - Math.abs(Math.sin(time * 24) * 20);
        
        if (droplet1Ref.current) {
          droplet1Ref.current.setAttribute("cx", "73");
          droplet1Ref.current.setAttribute("cy", drop1Y.toString());
          droplet1Ref.current.setAttribute("r", "1.8");
          droplet1Ref.current.style.opacity = (1 - (streamBottomY - drop1Y) / 16).toString();
        }
        if (droplet2Ref.current) {
          droplet2Ref.current.setAttribute("cx", "83");
          droplet2Ref.current.setAttribute("cy", drop2Y.toString());
          droplet2Ref.current.setAttribute("r", "1.5");
          droplet2Ref.current.style.opacity = (1 - (streamBottomY - drop2Y) / 12).toString();
        }
        if (droplet3Ref.current) {
          droplet3Ref.current.setAttribute("cx", "78");
          droplet3Ref.current.setAttribute("cy", drop3Y.toString());
          droplet3Ref.current.setAttribute("r", "1.2");
          droplet3Ref.current.style.opacity = (1 - (streamBottomY - drop3Y) / 20).toString();
        }
      } else {
        if (ripple1Ref.current) ripple1Ref.current.style.opacity = "0";
        if (ripple2Ref.current) ripple2Ref.current.style.opacity = "0";
        if (droplet1Ref.current) droplet1Ref.current.style.opacity = "0";
        if (droplet2Ref.current) droplet2Ref.current.style.opacity = "0";
        if (droplet3Ref.current) droplet3Ref.current.style.opacity = "0";
      }

      animFrameId = requestAnimationFrame(updateFluidPhysics);
    };

    tl.to(
      progressObj,
      {
        value: 100,
        duration: 7.9, // SLOWED DOWN (was 6.9)
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.floor(progressObj.value);
          setPercentage(val);

          const msgIndex = Math.min(
            Math.floor((val / 100) * STATUS_MESSAGES.length),
            STATUS_MESSAGES.length - 1
          );
          setStatusText(STATUS_MESSAGES[msgIndex]);
        }
      },
      0
    );

    tl.to(
      liquidObj,
      {
        value: 100,
        duration: 4.8, // SLOWED DOWN (was 3.8)
        ease: "power1.inOut",
        onStart: () => updateFluidPhysics(),
        onUpdate: () => {
          const lVal = liquidObj.value;
          const riseY = 62 - (lVal / 100) * 47; // 62 (empty) down to 15 (full)
          gsap.set(liquidLevelRef.current, { y: riseY });
        },
        onComplete: () => cancelAnimationFrame(animFrameId)
      },
      3.1
    );

    // Step 5: Sequential 5 Ice Cubes dropping & floating (64%, 69%, 74%, 78%, 82%)
    tl.to(ice1Ref.current, { y: 0, opacity: 0.85, rotation: 6, duration: 0.5, ease: "back.out(1.8)" }, 4.4);
    tl.to(ice2Ref.current, { y: 0, opacity: 0.85, rotation: -5, duration: 0.5, ease: "back.out(1.8)" }, 4.55);
    tl.to(ice3Ref.current, { y: 0, opacity: 1, rotation: 3, duration: 0.5, ease: "back.out(1.8)" }, 4.7);
    tl.to(ice4Ref.current, { y: 0, opacity: 1, rotation: 5, duration: 0.5, ease: "back.out(1.8)" }, 4.85);
    tl.to(ice5Ref.current, { y: 0, opacity: 1, rotation: -3, duration: 0.5, ease: "back.out(1.8)" }, 5.0);

    // Step 6: Citrus Wheel slice attaches on left rim (84% mark)
    tl.to(citrusRef.current, { scale: 1, rotation: 35, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, 5.2);

    // Step 12: Umbrella pops up
    tl.to(umbrellaRef.current, { y: 15, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, 5.4);

    // Step 8: Straw slides and rests inside left bowl (93% mark)
    tl.to(strawRef.current, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, 5.65);

    // Step 9: Shaker gently rotates back upright & flow thins and stops!
    tl.to(streamRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, 6.6);
    
    tl.add(() => capFloatTween.pause(), 6.65);

    tl.to(shakerCapRef.current, {
      y: 0,
      x: 0,
      opacity: 1,
      rotation: 0,
      duration: 0.5,
      ease: "back.out(1.2)"
    }, 6.7);

    tl.to(shakerRef.current, {
      rotation: 0,
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.85,
      duration: 0.6,
      ease: "power3.inOut",
    }, 7.0);

    // Step 10: Glass specular glow highlight upon completion
    const glassPaths = [glassRimRef.current, glassLipRef.current, glassStemRef.current, glassBaseRef.current];
    tl.to(glassPaths, {
      stroke: "#ffffff",
      opacity: 1.0,
      duration: 0.45,
      ease: "power2.out",
    }, 7.25);

    return () => cancelAnimationFrame(animFrameId);
  }, []);

  useEffect(() => {
    if (!statusRef.current) return;
    gsap.fromTo(statusRef.current, { opacity: 0, y: 4 }, { opacity: 0.85, y: 0, duration: 0.35, ease: "power2.out" });
  }, [statusText]);

  if (!active) return null;

  return (
    <div ref={containerRef} className="creative-loader" role="status" aria-live="polite" aria-label="Đang tải trang web NHÀ Bar">
      <div className="creative-loader__background" />
      <div className="creative-loader__grain" />

      <div ref={overlayRef} className="creative-loader__overlay">
        <div className="creative-loader__frame-top" aria-hidden="true">
          <div ref={brandRef} className="creative-loader__brand" style={{ opacity: 0 }}>
            <Image
              src="/logo-nha-bar-clean.png"
              alt="NHÀ Bar Logo"
              width={160}
              height={160}
              priority
              className="creative-loader__logo-image"
            />
          </div>
          <div className="creative-loader__coords">
            <span className="creative-loader__meta-item">EST. 2024 / CAFÉ & BAR</span>
            <span className="creative-loader__meta-item">COORD. 16.0465° N, 108.2464° E</span>
          </div>
        </div>

        <div ref={flowRef} className="creative-loader__flow" style={{ opacity: 0 }}>
          {/* Cinematic Spotlight & Gold Dust Backdrop */}
          <div className="creative-loader__spotlight-backdrop" aria-hidden="true">
            <div className="creative-loader__spotlight-glow" />
            
            {/* Shadow Play (Tropical Leaves) */}
            <svg className="creative-loader__shadow-leaf creative-loader__shadow-leaf--left" viewBox="0 0 100 150" aria-hidden="true">
              <path d="M-20,150 C30,100 50,50 80,-10 C50,20 20,40 -20,60 Z" />
              <path d="M-20,150 C20,110 30,70 60,10 C30,40 0,60 -30,80 Z" />
              <path d="M-20,150 C10,120 10,90 40,30 C10,60 -10,80 -40,100 Z" />
            </svg>

            <svg className="creative-loader__shadow-leaf creative-loader__shadow-leaf--right" viewBox="0 0 100 150" aria-hidden="true">
              <path d="M-20,150 C30,100 50,50 80,-10 C50,20 20,40 -20,60 Z" />
              <path d="M-20,150 C20,110 30,70 60,10 C30,40 0,60 -30,80 Z" />
              <path d="M-20,150 C10,120 10,90 40,30 C10,60 -10,80 -40,100 Z" />
            </svg>
            <div className="creative-loader__gold-dust creative-loader__gold-dust--1" />
            <div className="creative-loader__gold-dust creative-loader__gold-dust--2" />
            <div className="creative-loader__gold-dust creative-loader__gold-dust--3" />
            <div className="creative-loader__gold-dust creative-loader__gold-dust--4" />
            <div className="creative-loader__gold-dust creative-loader__gold-dust--5" />
          </div>

          <div ref={glassRef} className="creative-loader__station" style={{ opacity: 0 }}>
            <svg viewBox="-40 -100 240 250" className="creative-loader__glass-svg">
              <defs>
                {/* Rich Golden Amber Liquid Gradient */}
                <linearGradient id="liquid-amber-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ebd08b" stopOpacity="0.98" />
                  <stop offset="50%" stopColor="#b8782d" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#59310a" stopOpacity="0.95" />
                </linearGradient>

                {/* Shaker Dark Metallic Silver Gradient */}
                <linearGradient id="shaker-silver-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#71717a" />
                  <stop offset="25%" stopColor="#e4e4e7" />
                  <stop offset="50%" stopColor="#3f3f46" />
                  <stop offset="75%" stopColor="#a1a1aa" />
                  <stop offset="100%" stopColor="#27272a" />
                </linearGradient>

                {/* Shaker Dark Metallic Silver (Vertical) */}
                <linearGradient id="shaker-silver-v" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4d4d8" />
                  <stop offset="100%" stopColor="#52525b" />
                </linearGradient>

                {/* Stream Amber Gradient */}
                <linearGradient id="stream-amber-grad" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ebd08b" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#b8782d" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6e431a" stopOpacity="0.85" />
                </linearGradient>

                {/* Umbrella Gold Scalloped Paper Gradient */}
                <linearGradient id="shaker-bronze-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5c432c" />
                  <stop offset="30%" stopColor="#c19a6b" />
                  <stop offset="70%" stopColor="#966d43" />
                  <stop offset="100%" stopColor="#3d2a1b" />
                </linearGradient>
                <linearGradient id="shaker-bronze-v" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#c19a6b" />
                  <stop offset="100%" stopColor="#5c432c" />
                </linearGradient>

                {/* Umbrella Gold Scalloped Paper Gradient */}
                <linearGradient id="umbrella-paper-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f5d6a4" />
                  <stop offset="50%" stopColor="#c19a6b" />
                  <stop offset="100%" stopColor="#875e2e" />
                </linearGradient>

                {/* Citrus Rind Gradient */}
                <linearGradient id="citrus-rind-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8b15d" />
                  <stop offset="100%" stopColor="#a36e28" />
                </linearGradient>

                {/* Coupe glass inner bowl mask for liquid bounds */}
                <clipPath id="glass-interior-clip">
                  <path d="M26,35 C26,73 56,90 80,90 C104,90 134,73 134,35 Z" />
                </clipPath>

                {/* Animated Pour Mask for stream reveal */}
                <clipPath id="pour-mask">
                  <rect ref={streamMaskRef} x="-20" y="-100" width="220" height="0" />
                </clipPath>

                {/* Crystal 3D Ice Cube Template */}
                <g id="crystal-ice">
                  {/* Main Body */}
                  <rect x="-9" y="-9" width="18" height="18" rx="3" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />
                  {/* Inner Refraction Bevel */}
                  <rect x="-6" y="-6" width="12" height="12" rx="2" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                  {/* Corner Facet Lines */}
                  <line x1="-9" y1="-9" x2="-6" y2="-6" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                  <line x1="9" y1="-9" x2="6" y2="-6" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                  <line x1="9" y1="9" x2="6" y2="6" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                  <line x1="-9" y1="9" x2="-6" y2="6" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                  {/* Sharp Specular Edge Highlight */}
                  <path d="M-8,-4 L-8,-8 L-4,-8" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Internal Fracture & Bubble */}
                  <path d="M-2,2 L3,-1" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="2" cy="3" r="1.5" fill="rgba(255, 255, 255, 0.45)" />
                </g>
              </defs>

              {/* LAYER 0: Ambient Gold Glow behind the Glass */}
              <circle cx="80" cy="65" r="50" fill="rgba(193, 154, 107, 0.09)" filter="blur(18px)" />

              {/* Tapered Gravity-Driven Premium Fluid Stream (Rendered behind shaker spout) */}
              <g ref={streamRef} style={{ opacity: 0 }}>
                <path
                  ref={streamPathRef}
                  d="M154,-33 C135,5 76,45 76,86 L80,86 C80,45 142,15 164,-24 Z"
                  fill="url(#stream-amber-grad)"
                  clipPath="url(#pour-mask)"
                />
                <ellipse ref={glowRef} cx="78" cy="86" rx="14" ry="4" fill="#ebd08b" filter="blur(4px)" style={{ opacity: 0 }} />
              </g>

              {/* LAYER 1: 4-Piece Cobbler Shaker (Silver Metallic) */}
              <g ref={shakerRef} className="creative-loader__shaker-icon" style={{ opacity: 0 }}>
                {/* 1. Body (Cylindrical Tumbler) */}
                <path
                  d="M133,-44 L140,10 C140,14 160,14 160,10 L167,-44"
                  fill="none"
                  stroke="var(--accent-bronze)"
                  strokeWidth="1.5"
                />
                
                {/* 2. Top Joint Ring */}
                <path
                  d="M130,-50 L170,-50 L168,-44 L132,-44 Z"
                  fill="none"
                  stroke="var(--accent-bronze)"
                  strokeWidth="1.5"
                />

                {/* 3. Strainer Dome */}
                <path
                  d="M133,-50 C133,-65 137,-70 150,-70 C163,-70 167,-65 167,-50"
                  fill="none"
                  stroke="var(--accent-bronze)"
                  strokeWidth="1.5"
                />

                {/* 3.5. Strainer Neck / Spout (Revealed when cap is off) */}
                <g ref={spoutRef}>
                  <path
                    d="M142,-70 L142,-78 A8,2.5 0 0,0 158,-78 L158,-70 Z"
                    fill="none"
                    stroke="var(--accent-bronze)"
                    strokeWidth="1.5"
                  />
                  <ellipse cx="150" cy="-78" rx="8" ry="2.5" fill="none" stroke="var(--accent-bronze)" strokeWidth="1.5" />
                </g>

                {/* 4. Cap (Animates off during pouring) */}
                <g ref={shakerCapRef}>
                  <path
                    d="M140,-70 L140,-79 C140,-84 160,-84 160,-79 L160,-70 Z"
                    fill="none"
                    stroke="var(--accent-bronze)"
                    strokeWidth="1.5"
                  />
                  <path d="M145,-75 L155,-75" stroke="var(--accent-bronze)" strokeWidth="1.5" opacity="0.5" />
                </g>
              </g>

              {/* LAYER 2: Clipped Fluid level layer (68% Height Max Fill) */}
              <g clipPath="url(#glass-interior-clip)">
                <g ref={liquidLevelRef} style={{ transform: "translateY(55px)" }}>
                  <rect x="0" y="35" width="160" height="95" fill="url(#liquid-amber-grad)" />
                  
                  {/* Wave 1 (Deep Back Wave) */}
                  <path className="creative-loader__fluid-wave creative-loader__fluid-wave--back" d="M-100,35 Q-75,27 -50,35 T0,35 T50,35 T100,35 T150,35 T200,35 L200,120 L-100,120 Z" />

                  {/* Wave 2 (Middle Wave) */}
                  <path className="creative-loader__fluid-wave creative-loader__fluid-wave--mid" d="M-100,35 Q-75,31 -50,35 T0,35 T50,35 T100,35 T150,35 T200,35 L200,120 L-100,120 Z" />

                  {/* Wave 3 (Front Surface Specular Highlight Wave) - JS Animated for Collision Sync */}
                  <path ref={frontWaveRef} className="creative-loader__fluid-wave" d="M-100,35 Q-75,23 -50,35 T0,35 T50,35 T100,35 T150,35 T200,35 L200,120 L-100,120 Z" />

                  {/* Rising Carbonation Bubbles */}
                  <g className="creative-loader__bubbles">
                    <circle cx="52" cy="85" r="1.8" className="creative-loader__bubble creative-loader__bubble--1" />
                    <circle cx="70" cy="90" r="2.2" className="creative-loader__bubble creative-loader__bubble--2" />
                    <circle cx="86" cy="82" r="1.5" className="creative-loader__bubble creative-loader__bubble--3" />
                    <circle cx="104" cy="88" r="2.0" className="creative-loader__bubble creative-loader__bubble--4" />
                    <circle cx="62" cy="95" r="1.4" className="creative-loader__bubble creative-loader__bubble--5" />
                  </g>

                  {/* 5 Crystal Ice Cubes (Submerge -> float up on fill) */}
                  <g ref={ice1Ref} className="creative-loader__ice-group creative-loader__ice-group--deep" style={{ opacity: 0 }}>
                    <use href="#crystal-ice" x="46" y="66" />
                  </g>
                  <g ref={ice2Ref} className="creative-loader__ice-group creative-loader__ice-group--deep" style={{ opacity: 0 }}>
                    <use href="#crystal-ice" x="106" y="64" />
                  </g>
                  <g ref={ice3Ref} className="creative-loader__ice-group" style={{ opacity: 0 }}>
                    <use href="#crystal-ice" x="61" y="51" />
                  </g>
                  <g ref={ice4Ref} className="creative-loader__ice-group" style={{ opacity: 0 }}>
                    <use href="#crystal-ice" x="83" y="53" />
                  </g>
                  <g ref={ice5Ref} className="creative-loader__ice-group" style={{ opacity: 0 }}>
                    <use href="#crystal-ice" x="96" y="50" />
                  </g>
                </g>
              </g>

              {/* Realistic Splash ripples and droplets */}
              <ellipse ref={ripple1Ref} cx="78" cy="86" rx="0" ry="0" fill="none" stroke="rgba(235, 208, 139, 0.7)" strokeWidth="1.2" style={{ opacity: 0 }} />
              <ellipse ref={ripple2Ref} cx="78" cy="86" rx="0" ry="0" fill="none" stroke="rgba(235, 208, 139, 0.4)" strokeWidth="0.8" style={{ opacity: 0 }} />
              <circle ref={droplet1Ref} cx="74" cy="86" r="1.5" fill="#ebd08b" style={{ opacity: 0 }} />
              <circle ref={droplet2Ref} cx="82" cy="86" r="2" fill="#dfb88c" style={{ opacity: 0 }} />
              <circle ref={droplet3Ref} cx="78" cy="86" r="1.2" fill="#fff" style={{ opacity: 0 }} />

              {/* LAYER 3: Fresh Citrus Lime Slice (Slotted on Right Rim) */}
              <g ref={citrusRef} className="creative-loader__citrus-wheel" style={{ opacity: 0 }}>
                <circle cx="134" cy="38" r="13" fill="url(#citrus-rind-grad)" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
                <circle cx="134" cy="38" r="10.5" fill="rgba(232, 177, 93, 0.4)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
                <path d="M134,38 L134,27.5 M134,38 L143,33 M134,38 L143,43 M134,38 L134,48.5 M134,38 L125,43 M134,38 L125,33" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
              </g>

              {/* LAYER 4: Premium Cocktail Straw (Moved to Right) */}
              <g ref={strawRef} className="creative-loader__straw-group" style={{ opacity: 0 }}>
                <line x1="116" y1="8" x2="96" y2="78" className="creative-loader__straw-main" />
                <line x1="113" y1="9" x2="99" y2="73" className="creative-loader__straw-stripe" />
              </g>

              {/* LAYER 5: 3D Paper Cocktail Umbrella (Left rim, leaning left, longer stick) */}
              <g ref={umbrellaRef} className="creative-loader__umbrella-group" style={{ opacity: 0 }}>
                <line x1="116" y1="18" x2="124" y2="70" className="creative-loader__umbrella-shaft" />
                <path d="M96,18 C100,8 112,4 116,4 C120,4 132,8 136,18 Q126,21 116,18 Q106,21 96,18 Z" fill="url(#umbrella-paper-grad)" className="creative-loader__umbrella-canopy" />
                <path d="M116,4 L105,20 M116,4 L116,18 M116,4 L127,20" className="creative-loader__umbrella-spokes" />
                <line x1="116" y1="4" x2="116" y2="0" stroke="var(--accent-bronze)" strokeWidth="1.8" strokeLinecap="round" />
              </g>

              {/* LAYER 6: Glass Frame Outline & Double-Wall Crystal Refraction */}
              <path ref={glassRimRef} className="creative-loader__glass-rim" d="M25,35 C25,75 55,90 80,90 C105,90 135,75 135,35" fill="none" />
              <line ref={glassLipRef} className="creative-loader__glass-lip" x1="25" y1="35" x2="135" y2="35" fill="none" />
              <line ref={glassStemRef} className="creative-loader__glass-stem" x1="80" y1="90" x2="80" y2="135" fill="none" />
              <path ref={glassBaseRef} className="creative-loader__glass-base" d="M50,135 C50,135 62,137 80,137 C98,137 110,135 110,135" fill="none" />

              {/* Curved Glass Specular Highlight Line */}
              <path d="M28,40 C28,65 48,82 58,85" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
            </svg>
          </div>
        </div>

        <div className="creative-loader__frame-bottom" aria-hidden="true">
          <div className="creative-loader__address">
            <span className="creative-loader__meta-item">35 NGÕ THÌ SĨ, MỸ AN, ĐÀ NẴNG</span>
            <span className="creative-loader__meta-item">11:00 AM – LATE / MUSIC & DRINKS</span>
          </div>
          <div className="creative-loader__meta">
            <span ref={percentTextRef} className="creative-loader__percentage">{percentage}%</span>
            <span ref={statusRef} className="creative-loader__status">{statusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
