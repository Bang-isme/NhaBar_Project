import type {
  EventDetail,
  EventListItem,
  FeaturedEventData,
  PromotionItem,
} from "./featured-event";

/** Prototype mocks - used when API is down or returns empty (wireframe fill). */
export const MOCK_FEATURED: FeaturedEventData = {
  slug: "nha-late-session-aug",
  title: "NHÀ LATE SESSION",
  startsAt: "2026-08-08T21:00:00+07:00",
  posterUrl: "/posters/late-session.svg",
  offers: [
    {
      id: "mock-promo-2",
      title: "HAPPY HOUR 16:00–19:00",
      description: "Selected drinks giảm - chill trước khi sàn bật.",
    },
    {
      id: "mock-promo-1",
      title: "BUY 2 GET 1 - WATCH NIGHT",
      description:
        "Áp dụng tối xem bóng / late session. Hỏi bartender khi order.",
    },
  ],
};

export const MOCK_EVENTS_UPCOMING: EventListItem[] = [
  {
    id: "mock-1",
    slug: "nha-late-session-aug",
    title: "NHÀ LATE SESSION",
    description:
      "Resident night - chill sớm, bật muộn. Lineup local + guest drop.",
    startsAt: "2026-08-08T21:00:00+07:00",
    endsAt: "2026-08-09T02:00:00+07:00",
    posterUrl: "/posters/late-session.svg",
    collaborator: "Resident crew",
    isFeatured: true,
    statusLabel: "upcoming",
    offers: MOCK_FEATURED.offers,
  },
  {
    id: "mock-4",
    slug: "acoustic-in-nha",
    title: "ACOUSTIC IN NHÀ",
    description: "Unplugged night - live set mộc, đèn ấm, ngồi gần sân khấu.",
    startsAt: "2026-08-15T20:00:00+07:00",
    endsAt: "2026-08-15T23:30:00+07:00",
    posterUrl: "/posters/acoustic-night.svg",
    collaborator: "Mộc Band",
    isFeatured: false,
    statusLabel: "upcoming",
    offers: [
      {
        id: "mock-promo-2",
        title: "HAPPY HOUR 16:00–19:00",
        description: "Selected drinks giảm - chill trước khi sàn bật.",
      },
    ],
  },
  {
    id: "mock-2",
    slug: "jump-out-vol-3",
    title: "JUMP OUT VOL.3",
    description: "Rap night underground - open mic + main stage.",
    startsAt: "2026-08-22T20:30:00+07:00",
    endsAt: null,
    posterUrl: "/posters/jump-out.svg",
    collaborator: "Jump Out Collective",
    isFeatured: false,
    statusLabel: "upcoming",
  },
  {
    id: "mock-3",
    slug: "world-cup-watch",
    title: "WORLD CUP WATCH",
    description: "Màn lớn, đồ uống, ngồi dài - cùng nhà xem bóng.",
    startsAt: "2026-09-05T18:00:00+07:00",
    endsAt: null,
    posterUrl: "/posters/world-cup.svg",
    collaborator: null,
    isFeatured: false,
    statusLabel: "upcoming",
    offers: [
      {
        id: "mock-promo-1",
        title: "BUY 2 GET 1 - WATCH NIGHT",
        description:
          "Áp dụng tối xem bóng / late session. Hỏi bartender khi order.",
      },
    ],
  },
];

export const MOCK_EVENTS_PAST: EventListItem[] = [
  {
    id: "mock-past-1",
    slug: "jump-out-vol-2",
    title: "JUMP OUT VOL.2",
    description: "Archive night - sold-out vibe.",
    startsAt: "2026-06-14T21:00:00+07:00",
    endsAt: null,
    posterUrl: "/posters/jump-out.svg",
    collaborator: "Jump Out Collective",
    isFeatured: false,
    statusLabel: "past",
  },
];

export const MOCK_PROMOTIONS: PromotionItem[] = [
  {
    id: "mock-promo-1",
    title: "BUY 2 GET 1 - WATCH NIGHT",
    description:
      "Áp dụng tối xem bóng / late session. Hỏi bartender khi order.",
    bannerUrl: "/uploads/promos/buy2get1.svg",
    startsAt: "2026-07-01T00:00:00+07:00",
    endsAt: "2026-09-30T23:59:59+07:00",
  },
  {
    id: "mock-promo-2",
    title: "HAPPY HOUR 16:00–19:00",
    description: "Selected drinks giảm - chill trước khi sàn bật.",
    bannerUrl: "/uploads/promos/happy-hour.svg",
    startsAt: "2026-07-01T00:00:00+07:00",
    endsAt: null,
  },
];

const NIGHT_MEDIA: EventDetail["media"] = [
  {
    url: "/uploads/gallery/warm-lights.svg",
    altText: "Warm lights · NHÀ Bar",
    sortOrder: 1,
  },
  {
    url: "/uploads/gallery/late-crowd.svg",
    altText: "Crowd · late session",
    sortOrder: 2,
  },
  {
    url: "/uploads/gallery/bar-top.svg",
    altText: "Drinks · bar top",
    sortOrder: 3,
  },
];

/** Full detail for every mock event — no empty lineups on the detail page. */
export const MOCK_EVENT_DETAILS: Record<string, EventDetail> = {
  "nha-late-session-aug": {
    ...MOCK_EVENTS_UPCOMING[0],
    lineup: [
      { roleLabel: "Host", sortOrder: 1, stageName: "NHÀ Crew", socialUrl: null, avatarUrl: null },
      { roleLabel: "DJ", sortOrder: 2, stageName: "Miên Selector", socialUrl: null, avatarUrl: null },
      { roleLabel: "Guest", sortOrder: 3, stageName: "Khói", socialUrl: null, avatarUrl: null },
    ],
    media: NIGHT_MEDIA,
  },
  "acoustic-in-nha": {
    ...MOCK_EVENTS_UPCOMING[1],
    lineup: [
      { roleLabel: "Live set", sortOrder: 1, stageName: "Mộc Band", socialUrl: null, avatarUrl: null },
      { roleLabel: "Guest voice", sortOrder: 2, stageName: "Hà Nhi", socialUrl: null, avatarUrl: null },
      { roleLabel: "Host", sortOrder: 3, stageName: "NHÀ Crew", socialUrl: null, avatarUrl: null },
    ],
    media: NIGHT_MEDIA,
  },
  "jump-out-vol-3": {
    ...MOCK_EVENTS_UPCOMING[2],
    lineup: [
      { roleLabel: "Host", sortOrder: 1, stageName: "Jump Out Collective", socialUrl: null, avatarUrl: null },
      { roleLabel: "MC", sortOrder: 2, stageName: "Đen Đá", socialUrl: null, avatarUrl: null },
      { roleLabel: "Open mic", sortOrder: 3, stageName: "Crew Mỹ An", socialUrl: null, avatarUrl: null },
    ],
    media: NIGHT_MEDIA,
  },
  "world-cup-watch": {
    ...MOCK_EVENTS_UPCOMING[3],
    lineup: [
      { roleLabel: "Host", sortOrder: 1, stageName: "NHÀ Crew", socialUrl: null, avatarUrl: null },
    ],
    media: NIGHT_MEDIA,
  },
  "jump-out-vol-2": {
    ...MOCK_EVENTS_PAST[0],
    lineup: [
      { roleLabel: "Host", sortOrder: 1, stageName: "Jump Out Collective", socialUrl: null, avatarUrl: null },
      { roleLabel: "MC", sortOrder: 2, stageName: "Đen Đá", socialUrl: null, avatarUrl: null },
    ],
    media: NIGHT_MEDIA,
  },
};


export const MOCK_GALLERY = [
  { url: "/uploads/gallery/warm-lights.svg", alt: "Warm lights · NHÀ Bar" },
  { url: "/uploads/gallery/late-crowd.svg", alt: "Crowd · late session" },
  { url: "/uploads/gallery/bar-top.svg", alt: "Drinks · bar top" },
  { url: "/uploads/gallery/pour-night.svg", alt: "Pour night · house glass" },
  { url: "/uploads/gallery/door-mark.svg", alt: "Door mark · 35 Ngõ Thì Sĩ" },
  { url: "/uploads/gallery/floor-glow.svg", alt: "Floor glow · late set" },
] as const;
