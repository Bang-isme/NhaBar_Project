import { FALLBACK_FEATURED, type FeaturedEventData } from "./featured-event";
import type { EventDetail, EventListItem, PromotionItem } from "./featured-event";
import {
  MOCK_EVENT_DETAILS,
  MOCK_EVENTS_PAST,
  MOCK_EVENTS_UPCOMING,
  MOCK_FEATURED,
  MOCK_PROMOTIONS,
} from "./mock-data";
import {
  enrichEventList,
  withEventDetailFallback,
  withPosterFallback,
  withPromoArtFallback,
} from "./media-fallback";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getFeaturedEvent(): Promise<FeaturedEventData> {
  const json = await apiFetch<{ data: FeaturedEventData }>("/events/featured");
  const data = json?.data;
  if (data?.title) {
    return withPosterFallback({
      ...data,
      posterUrl: data.posterUrl ?? MOCK_FEATURED.posterUrl,
    });
  }
  return MOCK_FEATURED ?? FALLBACK_FEATURED;
}

export async function getEvents(
  filter: "upcoming" | "past" | "all" = "upcoming",
): Promise<EventListItem[]> {
  const json = await apiFetch<{ data: EventListItem[] }>(
    `/events?filter=${filter}`,
  );
  const data = json?.data ?? [];
  if (data.length > 0) return enrichEventList(data);
  if (filter === "past") return MOCK_EVENTS_PAST;
  if (filter === "all") return [...MOCK_EVENTS_UPCOMING, ...MOCK_EVENTS_PAST];
  return MOCK_EVENTS_UPCOMING;
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const json = await apiFetch<{ data: EventDetail }>(`/events/${slug}`);
  if (json?.data) return withEventDetailFallback(json.data);
  return MOCK_EVENT_DETAILS[slug] ?? null;
}

export type MenuItemData = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  flavorProfile: string | null;
  abv: string | null;
  isAvailable: boolean;
  isBestSeller: boolean;
  categoryId: string;
};

export type MenuCategoryData = {
  id: string;
  name: string;
  sortOrder: number;
  items: MenuItemData[];
};

export async function getMenuCategories(): Promise<MenuCategoryData[]> {
  const json = await apiFetch<{ data: MenuCategoryData[] }>("/menu/categories");
  return json?.data ?? [];
}

export async function getActivePromotions(): Promise<PromotionItem[]> {
  const json = await apiFetch<{ data: PromotionItem[] }>("/promotions/active");
  const data = json?.data ?? [];
  const source = data.length > 0 ? data : MOCK_PROMOTIONS;
  return source.map(withPromoArtFallback);
}
