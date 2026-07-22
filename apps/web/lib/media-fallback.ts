import {
  MOCK_EVENT_DETAILS,
  MOCK_EVENTS_PAST,
  MOCK_EVENTS_UPCOMING,
  MOCK_PROMOTIONS,
} from "./mock-data";
import type { EventDetail, EventListItem, PromotionItem } from "./featured-event";

const POSTER_BY_SLUG = new Map(
  [...MOCK_EVENTS_UPCOMING, ...MOCK_EVENTS_PAST]
    .filter((event) => event.posterUrl)
    .map((event) => [event.slug, event.posterUrl as string]),
);

const DEFAULT_POSTERS = [
  "/posters/late-session.svg",
  "/posters/acoustic-night.svg",
  "/posters/jump-out.svg",
  "/posters/world-cup.svg",
] as const;

const DEFAULT_PROMOS = [
  "/uploads/promos/buy2get1.svg",
  "/uploads/promos/happy-hour.svg",
] as const;

function pickByKey(key: string, pool: readonly string[]): string {
  const sum = [...key].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[sum % pool.length]!;
}

/** When live API rows omit art, keep the floor looking like NHÀ — not empty black. */
export function withPosterFallback<
  T extends { slug: string; posterUrl?: string | null },
>(event: T): T {
  if (event.posterUrl) return event;
  const fromMock = POSTER_BY_SLUG.get(event.slug);
  if (fromMock) return { ...event, posterUrl: fromMock };
  return { ...event, posterUrl: pickByKey(event.slug, DEFAULT_POSTERS) };
}

export function withEventDetailFallback(event: EventDetail): EventDetail {
  const enriched = withPosterFallback(event);
  const mock = MOCK_EVENT_DETAILS[event.slug];
  if (!mock) return enriched;
  return {
    ...enriched,
    media: enriched.media?.length > 0 ? enriched.media : mock.media,
    lineup: enriched.lineup?.length > 0 ? enriched.lineup : mock.lineup,
  };
}

export function withPromoArtFallback(promo: PromotionItem): PromotionItem {
  if (promo.bannerUrl) return promo;
  const fromMock = MOCK_PROMOTIONS.find((row) => row.id === promo.id)?.bannerUrl;
  if (fromMock) return { ...promo, bannerUrl: fromMock };

  const title = promo.title.toLowerCase();
  if (title.includes("happy")) {
    return { ...promo, bannerUrl: "/uploads/promos/happy-hour.svg" };
  }
  if (title.includes("buy") || title.includes("watch")) {
    return { ...promo, bannerUrl: "/uploads/promos/buy2get1.svg" };
  }
  return { ...promo, bannerUrl: pickByKey(promo.id, DEFAULT_PROMOS) };
}

export function enrichEventList(events: EventListItem[]): EventListItem[] {
  return events.map(withPosterFallback);
}
