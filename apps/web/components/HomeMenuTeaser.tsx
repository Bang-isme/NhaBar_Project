"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { getMenuTeaser } from "@/lib/menu";

export function HomeMenuTeaser() {
  const { locale, ui } = useLocale();
  const categories = getMenuTeaser(locale);
  const [lead, ...sides] = categories;

  if (!lead) return null;

  return (
    <section
      className="home-menu section-block section-frame"
      aria-labelledby="home-menu-heading"
    >
      <Reveal className="section-head section-head--row" mode="slide">
        <div className="section-head__copy">
          <h2 id="home-menu-heading" className="section-title">
            {ui.home.menuTitle}
          </h2>
          <p className="section-support">{ui.home.menuSupport}</p>
        </div>
        <Link className="text-link section-head__link" href="/menu">
          {ui.home.menuCta}
          <span className="text-link__icon" aria-hidden="true">
            ↗
          </span>
        </Link>
      </Reveal>

      <div className="menu-teaser-grid menu-teaser-grid--asymmetric">
        <Reveal className="menu-teaser-grid__lead" mode="rise" delay={0.04}>
          <Link
            className="menu-teaser-tile menu-teaser-tile--link menu-teaser-tile--lead"
            href="/menu"
            aria-label={`${lead.title} - ${ui.home.menuCta}`}
          >
            <header className="menu-teaser-tile__head">
              <p className="section-label">{lead.title}</p>
              <p className="menu-teaser-tile__support">{lead.support}</p>
            </header>
            <ul className="menu-teaser-tile__list">
              {lead.items.slice(0, 5).map((item) => (
                <li key={item.name} className="menu-teaser-tile__row">
                  <span className="menu-teaser-tile__name">{item.name}</span>
                  <span className="menu-teaser-tile__leader" aria-hidden="true" />
                  {item.priceHint ? (
                    <span className="menu-teaser-tile__price">
                      {item.priceHint}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <footer className="menu-teaser-tile__foot">
              <span>
                {Math.min(5, lead.items.length)} {ui.menuPage.itemsUnit}
              </span>
              <span className="menu-teaser-tile__cta">{ui.home.menuCta}</span>
            </footer>
            <span className="menu-teaser-tile__go" aria-hidden="true">
              ↗
            </span>
          </Link>
        </Reveal>

        <div className="menu-teaser-grid__stack">
          {sides.map((category, index) => {
            const shown = category.items.slice(0, 3);
            return (
              <Reveal
                key={category.id}
                className="menu-teaser-grid__side"
                mode="rise"
                delay={0.08 + index * 0.06}
              >
                <Link
                  className="menu-teaser-tile menu-teaser-tile--link"
                  href="/menu"
                  aria-label={`${category.title} - ${ui.home.menuCta}`}
                >
                  <header className="menu-teaser-tile__head">
                    <p className="section-label">{category.title}</p>
                    <p className="menu-teaser-tile__support">
                      {category.support}
                    </p>
                  </header>
                  <ul className="menu-teaser-tile__list">
                    {shown.map((item) => (
                      <li key={item.name} className="menu-teaser-tile__row">
                        <span className="menu-teaser-tile__name">{item.name}</span>
                        <span
                          className="menu-teaser-tile__leader"
                          aria-hidden="true"
                        />
                        {item.priceHint ? (
                          <span className="menu-teaser-tile__price">
                            {item.priceHint}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                  <footer className="menu-teaser-tile__foot">
                    <span>
                      {shown.length} {ui.menuPage.itemsUnit}
                    </span>
                    <span className="menu-teaser-tile__cta">
                      {ui.home.menuCta}
                    </span>
                  </footer>
                  <span className="menu-teaser-tile__go" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
