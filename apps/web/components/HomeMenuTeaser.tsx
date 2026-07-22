"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { getMenuTeaser } from "@/lib/menu";

export function HomeMenuTeaser() {
  const { locale, ui } = useLocale();
  const categories = getMenuTeaser(locale);

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
        {categories.map((category, index) => (
          <Reveal
            key={category.id}
            delay={index * 0.06}
            mode={index === 0 ? "clip" : "rise"}
            className={
              index === 0 ? "menu-teaser-grid__lead" : "menu-teaser-grid__side"
            }
          >
            <Link
              className={`menu-teaser-tile menu-teaser-tile--link${
                index === 0 ? " menu-teaser-tile--lead" : ""
              }`}
              href="/menu"
              aria-label={`${category.title} — ${ui.home.menuCta}`}
            >
              <p className="section-label">{category.title}</p>
              <p className="menu-teaser-tile__support">{category.support}</p>
              <ul className="menu-teaser-tile__list">
                {category.items.slice(0, index === 0 ? 4 : 2).map((item) => (
                  <li key={item.name} className="menu-teaser-tile__row">
                    <span>{item.name}</span>
                    {item.priceHint ? (
                      <span className="menu-teaser-tile__price">
                        {item.priceHint}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <span className="menu-teaser-tile__go" aria-hidden="true">
                ↗
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
