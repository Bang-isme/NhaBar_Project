"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { getMenuTeaser } from "@/lib/menu";
import { IconArrowUpRight } from "@/components/icons/AppIcons";

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
          <IconArrowUpRight size={13} className="text-link__icon" />
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
              <IconArrowUpRight size={14} />
            </span>
          </Link>
        </Reveal>

        <div className="menu-teaser-grid__stack">
          {sides.map((category, index) => {
            const shown = category.items.slice(0, 3);
            return (
              <Reveal
                key={category.id}
                className="menu-teaser-tile hover-lift"
                delay={0.1 + index * 0.08}
                mode="rise"
              >
                <Link
                  href={`/menu#cat-${category.id}`}
                  className="menu-teaser-tile__media-wrap"
                >
                  <div className="menu-teaser-tile__media">
                    <Image
                      src={
                        category.coverUrl ||
                        MOCK_MENU_ITEMS.find((i) => i.categoryId === category.id)
                          ?.imageUrl ||
                        "/uploads/hero/speakeasy-bar.png"
                      }
                      alt={category.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 24vw"
                      className="menu-teaser-tile__img"
                    />
                  </div>
                  <div className="menu-teaser-tile__header">
                    <p className="menu-teaser-tile__kicker">
                      {ui.menuPage.categoryLabel}
                    </p>
                    <h3 className="menu-teaser-tile__title">{category.name}</h3>
                  </div>
                  <ul className="menu-teaser-tile__list">
                    {shown.map((item) => (
                      <li key={item.id}>
                        <span className="menu-teaser-tile__item-name">
                          {item.name}
                        </span>
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
                    <IconArrowUpRight size={14} />
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
