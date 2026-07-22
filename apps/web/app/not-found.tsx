"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useLocale } from "@/components/LocaleProvider";

export default function NotFound() {
  const { ui } = useLocale();

  return (
    <div className="page-screen page-screen--system">
      <div className="container stack-page">
        <header className="page-hero page-hero--center">
          <BrandLogo showWordmark />
          <div className="page-hero__copy">
            <p className="hero-loc">{ui.system.notFoundKicker}</p>
            <h1>{ui.system.notFoundTitle}</h1>
            <p className="page-hero__lead">{ui.system.notFoundLead}</p>
            <div className="cta-row">
              <PrimaryButton href="/">{ui.system.home}</PrimaryButton>
              <PrimaryButton href="/events" variant="ghost">
                {ui.system.viewEvents}
              </PrimaryButton>
            </div>
            <p className="system-contact">
              <Link href="/contact">{ui.system.contact} →</Link>
            </p>
          </div>
          <div className="page-hero__rule" aria-hidden="true" />
        </header>
      </div>
    </div>
  );
}
