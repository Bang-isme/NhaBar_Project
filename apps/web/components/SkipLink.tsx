"use client";

import { useLocale } from "@/components/LocaleProvider";

export function SkipLink() {
  const { ui } = useLocale();
  return (
    <a className="skip-link" href="#main-content">
      {ui.skipLink}
    </a>
  );
}
