"use client";

import { useEffect } from "react";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useLocale } from "@/components/LocaleProvider";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { ui } = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-screen page-screen--system">
      <div className="container stack-page">
        <header className="page-hero page-hero--center">
          <div className="page-hero__copy">
            <p className="hero-loc">{ui.system.errorKicker}</p>
            <h1>{ui.system.errorTitle}</h1>
            <p className="page-hero__lead">{ui.system.errorLead}</p>
            <div className="cta-row">
              <button type="button" className="btn-primary group" onClick={reset}>
                <span className="btn__label">{ui.system.retry}</span>
                <span className="btn__icon" aria-hidden="true">
                  ↗
                </span>
              </button>
              <PrimaryButton href="/" variant="ghost">
                {ui.system.home}
              </PrimaryButton>
            </div>
          </div>
          <div className="page-hero__rule" aria-hidden="true" />
        </header>
      </div>
    </div>
  );
}
