"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BrandLogo } from "@/components/BrandLogo";
import { useLocale } from "@/components/LocaleProvider";
import { LOCALE_OPTIONS, NAV_ITEMS, type Locale } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { VENUE } from "@/lib/venue";

gsap.registerPlugin(useGSAP);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LanguageSwitch({
  locale,
  onChange,
  label,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
}) {
  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={label}
      data-chrome="lang"
    >
      {LOCALE_OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={
            locale === option.code
              ? "lang-switch__btn is-active"
              : "lang-switch__btn"
          }
          aria-pressed={locale === option.code}
          aria-label={option.label}
          onClick={() => onChange(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, ui } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement>(null);

  const leftLinks = NAV_ITEMS.filter((item) => item.side === "left");
  const rightLinks = NAV_ITEMS.filter((item) => item.side === "right");

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const brand = el.querySelectorAll("[data-chrome='brand']");
      const links = el.querySelectorAll("[data-chrome='link']");
      const lang = el.querySelectorAll("[data-chrome='lang']");
      const toggle = el.querySelectorAll("[data-chrome='toggle']");

      if (prefersReducedMotion()) {
        gsap.set([brand, links, lang, toggle], {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      gsap.set([links, lang, toggle], { opacity: 0, y: 8 });
      gsap.set(brand, { opacity: 0, y: -6 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(brand, { opacity: 1, y: 0, duration: 0.65 })
        .to(
          links,
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.4 },
          "-=0.25",
        )
        .to(
          [lang, toggle],
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.35 },
          "-=0.2",
        );
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className={scrolled ? "site-header is-scrolled" : "site-header"}
    >
      <div className={`site-header__bar${open ? " is-open" : ""}`}>
        <div className="site-header__inner">
          <div className="site-header__rail">
            <nav
              className="site-nav site-nav--left"
              aria-label={`${ui.primaryNav} · ${ui.navSideLeft}`}
            >
              <ul className="nav-links">
                {leftLinks.map((link) => (
                  <li key={link.href} data-chrome="link">
                    <Link
                      href={link.href}
                      aria-current={
                        isActive(pathname, link.href) ? "page" : undefined
                      }
                      onClick={() => setOpen(false)}
                    >
                      {ui.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-header__brand" data-chrome="brand">
              <BrandLogo size="nav" priority />
            </div>

            <nav
              className="site-nav site-nav--right"
              aria-label={`${ui.primaryNav} · ${ui.navSideRight}`}
            >
              <ul className="nav-links">
                {rightLinks.map((link) => (
                  <li key={link.href} data-chrome="link">
                    <Link
                      href={link.href}
                      aria-current={
                        isActive(pathname, link.href) ? "page" : undefined
                      }
                      onClick={() => setOpen(false)}
                    >
                      {ui.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="site-header__edge">
            <LanguageSwitch
              locale={locale}
              onChange={setLocale}
              label={ui.language}
            />
            <button
              type="button"
              className="nav-toggle"
              data-chrome="toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav-toggle__bars" aria-hidden="true" />
              <span className="visually-hidden">
                {open ? ui.closeMenu : ui.openMenu}
              </span>
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          className="site-nav-mobile"
          aria-label={ui.primaryNav}
          aria-hidden={!open}
        >
          <div>
            <p className="site-nav-mobile__kicker">{ui.menuKicker}</p>
            <ul className="nav-links nav-links--mobile">
              {NAV_ITEMS.map((link, i) => (
                <li
                  key={link.href}
                  style={{
                    transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={
                      isActive(pathname, link.href) ? "page" : undefined
                    }
                    onClick={() => setOpen(false)}
                  >
                    {ui.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-nav-mobile__meta">
            <strong>{ui.cafeBarMyAn}</strong>
            <p>{VENUE.addressShort}</p>
            <p>{ui.venue.hoursLabel}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
