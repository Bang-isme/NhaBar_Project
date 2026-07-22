"use client";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { getFullMenu } from "@/lib/menu";
import { VENUE } from "@/lib/venue";

export function MenuView() {
  const { locale, ui } = useLocale();
  const categories = getFullMenu(locale);

  return (
    <div className="page-screen">
      <div className="container stack-page">
        <PageHero
          title={ui.menuPage.title}
          lead={ui.menuPage.lead}
          aside={
            <p className="page-hero__aside-text">
              {ui.menuPage.asideMain}
              <span>{VENUE.addressShort}</span>
            </p>
          }
        />

        <div className="menu-board">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05}>
              <section
                className="menu-category"
                aria-labelledby={`menu-cat-${category.id}`}
              >
                <header className="menu-category__head">
                  <span className="menu-category__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="menu-category__title-row">
                    <h2
                      id={`menu-cat-${category.id}`}
                      className="section-title"
                    >
                      {category.title}
                    </h2>
                    <span className="menu-category__count">
                      {category.items.length} {ui.menuPage.itemsUnit}
                    </span>
                  </div>
                  <p className="section-support">{category.support}</p>
                </header>
                <ul className="menu-category__list">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className={
                        item.signature
                          ? "menu-category__item menu-category__item--signature"
                          : "menu-category__item"
                      }
                    >
                      <div className="menu-category__info">
                        <span className="menu-category__name">
                          {item.name}
                          {item.signature ? (
                            <span className="menu-pick">
                              ★ {ui.menuPage.signature}
                            </span>
                          ) : null}
                        </span>
                        {item.note ? (
                          <span className="menu-category__note">
                            {item.note}
                          </span>
                        ) : null}
                      </div>
                      <span className="menu-category__leader" aria-hidden="true" />
                      {item.priceHint ? (
                        <span className="menu-category__price">
                          {item.priceHint}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>

        <p className="menu-board__note">{ui.menuPage.note}</p>
      </div>
    </div>
  );
}
