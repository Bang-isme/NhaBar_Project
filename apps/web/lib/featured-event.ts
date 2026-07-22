import { localeToBcp47, type Locale } from "./i18n";

export type EventStatusLabel = "upcoming" | "past";

export type EventOffer = {
  id: string;
  title: string;
  description: string | null;
};

export type EventListItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  posterUrl: string | null;
  collaborator: string | null;
  isFeatured: boolean;
  statusLabel: EventStatusLabel;
  offers?: EventOffer[];
};

export type EventDetail = EventListItem & {
  lineup: Array<{
    roleLabel: string;
    sortOrder: number;
    stageName: string;
    socialUrl: string | null;
    avatarUrl: string | null;
  }>;
  media: Array<{
    url: string;
    altText: string | null;
    sortOrder: number;
  }>;
};

export type PromotionItem = {
  id: string;
  title: string;
  description: string | null;
  bannerUrl: string | null;
  startsAt: string;
  endsAt: string | null;
};

export type FeaturedEventData = {
  slug: string;
  title: string;
  startsAt: string;
  posterUrl?: string | null;
  offers?: EventOffer[];
};

export const FALLBACK_FEATURED: FeaturedEventData = {
  slug: "nha-late-session-aug",
  title: "NHÀ LATE SESSION",
  startsAt: "2026-08-08T21:00:00+07:00",
  posterUrl: "/posters/late-session.svg",
  offers: [
    {
      id: "fallback-offer-1",
      title: "HAPPY HOUR 16:00–19:00",
      description: "Selected drinks giảm – chill trước khi sàn bật.",
    },
  ],
};

/** Poster-style date parts (big day number + short month) for event cards. */
export function formatEventDayParts(
  iso: string,
  locale: Locale = "vi",
): { day: string; month: string } {
  const date = new Date(iso);
  const day = new Intl.DateTimeFormat(localeToBcp47(locale), {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
  }).format(date);
  const month = new Intl.DateTimeFormat(localeToBcp47(locale), {
    timeZone: "Asia/Ho_Chi_Minh",
    month: "short",
  }).format(date);
  return { day, month };
}

export function formatEventDate(iso: string, locale: Locale = "vi"): string {
  return new Intl.DateTimeFormat(localeToBcp47(locale), {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "short",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** Weekday + calendar day (no clock) for nightboard when-row. */
export function formatEventDayLabel(iso: string, locale: Locale = "vi"): string {
  return new Intl.DateTimeFormat(localeToBcp47(locale), {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(iso));
}

/** Clock-only label for nightboard cards (time guests decide on). */
export function formatEventTime(iso: string, locale: Locale = "vi"): string {
  return new Intl.DateTimeFormat(localeToBcp47(locale), {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function statusBadgeLabel(
  status: EventStatusLabel,
  locale: Locale = "vi",
): string {
  if (locale === "en") {
    return status === "upcoming" ? "Upcoming" : "Past";
  }
  if (locale === "ru") {
    return status === "upcoming" ? "Скоро" : "Прошло";
  }
  return status === "upcoming" ? "Sắp diễn ra" : "Đã qua";
}
