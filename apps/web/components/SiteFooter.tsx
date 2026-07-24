"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { useLocale } from "@/components/LocaleProvider";
import { NAV_ITEMS } from "@/lib/i18n";
import { VENUE } from "@/lib/venue";
import {
  IconFacebook,
  IconInstagram,
  IconTikTok,
  IconMapPin,
} from "@/components/icons/AppIcons";

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
          <div className="site-footer__social">
            <p className="site-footer__social-label">
              {ui.contact.followUs}
            </p>
            <div className="social-icon-row social-icon-row--sm">
              <a
                href={VENUE.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Facebook NHÀ Bar"
                title="Facebook"
              >
                <IconFacebook size={16} />
              </a>
              <a
                href={VENUE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Instagram NHÀ Bar"
                title="Instagram"
              >
                <IconInstagram size={16} />
              </a>
              <a
                href={VENUE.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="TikTok NHÀ Bar"
                title="TikTok"
              >
                <IconTikTok size={16} />
              </a>
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn social-icon-btn--maps"
                aria-label="Google Maps"
                title="Google Maps"
              >
                <IconMapPin size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>{ui.footer.city}</span>
          <span>{ui.venue.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
