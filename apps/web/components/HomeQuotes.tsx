"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function HomeQuotes() {
  const { ui } = useLocale();
  const [lead, ...rest] = ui.quotes.items;

  return (
    <section
      className="home-quotes section-block section-frame"
      aria-labelledby="home-quotes-heading"
    >
      <Reveal className="section-head" mode="slide">
        <div className="section-head__copy">
          <h2 id="home-quotes-heading" className="section-title">
            {ui.quotes.title}
          </h2>
          <p className="section-support">{ui.quotes.support}</p>
        </div>
      </Reveal>
      <div className="quote-wall quote-wall--editorial">
        <Reveal className="quote-wall__lead" mode="clip">
          <figure className="quote-card quote-card--lead quote-card--pull">
            <blockquote>
              <p>“{lead.text}”</p>
            </blockquote>
            <figcaption>
              <strong>{lead.author}</strong>
              <span>{lead.detail}</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="quote-wall__stack">
          {rest.map((quote, index) => (
            <Reveal key={quote.author} delay={0.08 + index * 0.07} mode="slide">
              <figure className="quote-card quote-card--tight">
                <blockquote>
                  <p>“{quote.text}”</p>
                </blockquote>
                <figcaption>
                  <strong>{quote.author}</strong>
                  <span>{quote.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
