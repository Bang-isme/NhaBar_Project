"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { useLocale } from "@/components/LocaleProvider";
import { NAV_ITEMS } from "@/lib/i18n";
import { VENUE } from "@/lib/venue";

export function SiteFooter() {
  const { ui } = useLocale();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <div className="site-footer__brand">
            <BrandLogo showWordmark={false} />
            <div>
              <strong className="site-footer__name">NHÀ Bar</strong>
              <p className="site-footer__meta site-footer__meta--tight">
                “{ui.venue.tagline}”
              </p>
            </div>
          </div>
          <p className="site-footer__blurb">{ui.venue.supportLine}</p>
        </div>
        <nav className="site-footer__nav" aria-label={ui.primaryNav}>
          <ul>
            {NAV_ITEMS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{ui.nav[link.key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__meta">
          <p className="site-footer__line">{VENUE.addressShort}</p>
          <p className="site-footer__line">{ui.venue.hoursLabel}</p>
          <p className="site-footer__line">
            <a href={VENUE.facebookUrl} target="_blank" rel="noreferrer">
              {ui.footer.facebook}
            </a>
          </p>
        </div>
        <div className="site-footer__bottom">
          <span>{ui.footer.city}</span>
          <span>{ui.venue.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
