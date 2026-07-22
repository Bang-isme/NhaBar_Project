"use client";

import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useLocale } from "@/components/LocaleProvider";
import type { EventListItem } from "@/lib/featured-event";
import { VENUE } from "@/lib/venue";

export function EventsView({
  upcoming,
  past,
}: {
  upcoming: EventListItem[];
  past: EventListItem[];
}) {
  const { ui } = useLocale();

  return (
    <div className="page-screen">
      <div className="container stack-page">
        <PageHero
          title={ui.events.title}
          lead={ui.events.lead}
          aside={
            <p className="page-hero__aside-text">
              {ui.events.asideMain}
              <span>{ui.events.asideSub}</span>
            </p>
          }
        />

        <section aria-labelledby="upcoming-heading" className="events-section">
          <Reveal className="section-head" mode="slide">
            <div className="section-head__copy">
              <h2 id="upcoming-heading" className="section-title">
                {ui.events.upcoming}
                {upcoming.length > 0 ? (
                  <sup className="section-title__count">{upcoming.length}</sup>
                ) : null}
              </h2>
              <p className="section-support">
                {ui.events.upcomingSupport} {VENUE.addressShort}.
              </p>
            </div>
          </Reveal>
          {upcoming.length > 0 ? (
            <div className="events-wall">
              {upcoming.map((event, index) => (
                <Reveal
                  key={event.id}
                  className={index === 0 ? "events-wall__lead" : undefined}
                  delay={index * 0.06}
                  mode={index === 0 ? "clip" : "rise"}
                >
                  <EventCard event={event} featured={index === 0} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="events-empty">
                <p className="events-empty__text">{ui.events.empty}</p>
                <PrimaryButton href={VENUE.facebookUrl}>
                  {ui.events.openFacebook}
                </PrimaryButton>
              </div>
            </Reveal>
          )}
        </section>

        {past.length > 0 ? (
          <section aria-labelledby="past-heading" className="events-section">
            <Reveal className="section-head" mode="slide">
              <div className="section-head__copy">
                <h2 id="past-heading" className="section-title">
                  {ui.events.past}
                  <sup className="section-title__count">{past.length}</sup>
                </h2>
                <p className="section-support">{ui.events.pastSupport}</p>
              </div>
            </Reveal>
            <div className="events-wall events-wall--archive">
              {past.map((event, index) => (
                <Reveal key={event.id} delay={index * 0.05}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
