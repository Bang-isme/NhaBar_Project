export type Locale = "vi" | "en" | "ru";

export const LOCALE_STORAGE_KEY = "nhabar-locale";
export const DEFAULT_LOCALE: Locale = "vi";

export const LOCALE_OPTIONS: {
  code: Locale;
  label: string;
  htmlLang: string;
}[] = [
  { code: "en", label: "EN", htmlLang: "en" },
  { code: "vi", label: "VN", htmlLang: "vi" },
  { code: "ru", label: "RU", htmlLang: "ru" },
];

export type NavKey = "home" | "events" | "promos" | "menu" | "contact";

export const NAV_ITEMS: {
  key: NavKey;
  href: string;
  side: "left" | "right";
}[] = [
  { key: "home", href: "/", side: "left" },
  { key: "events", href: "/events", side: "left" },
  { key: "promos", href: "/promotions", side: "right" },
  { key: "menu", href: "/menu", side: "right" },
  { key: "contact", href: "/contact", side: "right" },
];

const DATE_LOCALE: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-GB",
  ru: "ru-RU",
};

export function localeToBcp47(locale: Locale): string {
  return DATE_LOCALE[locale];
}

type UiCopy = {
  nav: Record<NavKey, string>;
  openMenu: string;
  closeMenu: string;
  primaryNav: string;
  language: string;
  skipLink: string;
  directions: string;
  menuKicker: string;
  cafeBarMyAn: string;
  posterAlt: string;
  navSideLeft: string;
  navSideRight: string;
  venue: {
    tagline: string;
    supportLine: string;
    hoursLabel: string;
  };
  hero: {
    location: string;
    viewEvents: string;
    visitVenue: string;
    scenes: [string, string, string];
  };
  vibe: {
    title: string;
    support: string;
    pillars: Array<{ label: string; text: string }>;
  };
  featured: {
    title: string;
    support: string;
    blurb: string;
    details: string;
    offerLabel: string;
  };
  home: {
    promoTitle: string;
    promoSupport: string;
    allPromos: string;
    promoEmpty: string;
    promoEyebrow: string;
    galleryTitle: string;
    gallerySupport: string;
    galleryShots: string[];
    ctaSupport: string;
    eventSchedule: string;
    menuTitle: string;
    menuSupport: string;
    menuCta: string;
    upcomingTitle: string;
    upcomingSupport: string;
    allEvents: string;
  };
  quotes: {
    title: string;
    support: string;
    items: Array<{ text: string; author: string; detail: string }>;
  };
  menuPage: {
    title: string;
    lead: string;
    asideMain: string;
    note: string;
    signature: string;
    itemsUnit: string;
  };
  events: {
    title: string;
    lead: string;
    asideMain: string;
    asideSub: string;
    upcoming: string;
    upcomingSupport: string;
    empty: string;
    openFacebook: string;
    past: string;
    pastSupport: string;
    upcomingBadge: string;
    pastBadge: string;
  };
  promos: {
    title: string;
    lead: string;
    asideMain: string;
    empty: string;
    contact: string;
    facebook: string;
  };
  contact: {
    title: string;
    lead: string;
    address: string;
    hours: string;
    vibe: string;
    vibeValue: string;
    openMaps: string;
    facebook: string;
    mapTitle: string;
    bandLabel: string;
    bandTitle: string;
    bandSupport: string;
    seeEvents: string;
  };
  footer: {
    facebook: string;
    city: string;
  };
  eventDetail: {
    label: string;
    allEvents: string;
    visitVenue: string;
    lineup: string;
    gallery: string;
    offers: string;
    back: string;
    when: string;
    where: string;
    host: string;
  };
  system: {
    errorKicker: string;
    errorTitle: string;
    errorLead: string;
    retry: string;
    home: string;
    notFoundKicker: string;
    notFoundTitle: string;
    notFoundLead: string;
    viewEvents: string;
    contact: string;
  };
  ticker: string[];
};

const UI: Record<Locale, UiCopy> = {
  vi: {
    nav: {
      home: "Trang chủ",
      events: "Sự kiện",
      promos: "Ưu đãi",
      menu: "Menu",
      contact: "Liên hệ",
    },
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    primaryNav: "Điều hướng chính",
    language: "Ngôn ngữ",
    skipLink: "Bỏ qua điều hướng",
    directions: "Chỉ đường",
    menuKicker: "NHÀ · Menu",
    cafeBarMyAn: "Café & Bar · Mỹ An",
    posterAlt: "Poster",
    navSideLeft: "trái",
    navSideRight: "phải",
    venue: {
      tagline: "A place called home",
      supportLine: "Chillin’ & Warm Space · Good Music · Good Drinks",
      hoursLabel: "11:00 – Late",
    },
    hero: {
      location: "Café & Bar · Mỹ An, Đà Nẵng",
      viewEvents: "Xem sự kiện",
      visitVenue: "Đến quán",
      scenes: ["Đèn khuya", "Good Music", "Good Drinks"],
    },
    vibe: {
      title: "Ba nhịp của nhà",
      support: "Chill ngày, bật đêm - luôn về nhà.",
      pillars: [
        {
          label: "Chillin’ & Warm Space",
          text: "Ghế ấm, ánh đèn thấp - ngồi lâu cũng được.",
        },
        {
          label: "Good Music",
          text: "Late session, rap night, nhịp underground.",
        },
        {
          label: "Good Drinks",
          text: "Đồ uống rõ vị - chill ngày, bật đêm.",
        },
      ],
    },
    featured: {
      title: "Sắp tới trên sàn",
      support: "Show chính của nhà - poster, giờ, lineup một chỗ.",
      blurb: "Underground night tại Mỹ An - vào sớm chill, tối bật nhịp.",
      details: "Chi tiết show",
      offerLabel: "Ưu đãi đêm này",
    },
    home: {
      promoTitle: "Ưu đãi tại quán",
      promoSupport: "Ưu đãi đang chạy - rõ ràng, không trôi trong feed.",
      allPromos: "Tất cả promo",
      promoEmpty: "Hiện chưa có ưu đãi active. Follow Facebook hoặc ghé quán hỏi bartender.",
      promoEyebrow: "Ưu đãi",
      galleryTitle: "Không khí nhà",
      gallerySupport: "Warm lights, late nights tại Mỹ An.",
      galleryShots: [
        "Ánh đèn ấm · NHÀ Bar",
        "Crowd · late session",
        "Drinks · quầy bar",
        "Pour night · ly nhà",
        "Cửa NHÀ · 35 Ngõ Thì Sĩ",
        "Floor glow · late set",
      ],
      ctaSupport: "Café ban ngày, bar về đêm. A place called home.",
      eventSchedule: "Lịch sự kiện",
      menuTitle: "Menu nhà",
      menuSupport: "Gợi vị — café ban ngày, pour về đêm. Xem full tại Menu.",
      menuCta: "Xem menu đầy đủ",
      upcomingTitle: "Lịch sắp tới",
      upcomingSupport: "Những đêm tiếp theo trên sàn — lưu lịch trước, khỏi lỡ drop.",
      allEvents: "Tất cả sự kiện",
    },
    quotes: {
      title: "Người ở nhà nói gì",
      support: "Vài lời để lại sau những đêm ở NHÀ.",
      items: [
        {
          text: "Ngồi từ chiều tới khuya mà không chán — đèn ấm, nhạc vừa đủ để còn nói chuyện với nhau.",
          author: "Minh Trí",
          detail: "Khách quen · Mỹ An",
        },
        {
          text: "Late session thứ 7 là lý do mình ở lại Đà Nẵng lâu hơn dự định.",
          author: "Egor",
          detail: "Expat · 6 tháng ở Đà Nẵng",
        },
        {
          text: "Đúng kiểu “a place called home” — không biết order gì thì bartender gợi ý chuẩn luôn.",
          author: "Thanh Hằng",
          detail: "Ghé lần đầu, quay lại lần ba",
        },
      ],
    },
    menuPage: {
      title: "Menu",
      lead: "Curated list — café, signature pours, late bites. Giá tham khảo; hỏi bartender để order chính xác.",
      asideMain: "House list",
      note: "Giá và món có thể đổi theo ngày. Hỏi bartender để order chính xác.",
      signature: "Nhà chọn",
      itemsUnit: "món",
    },
    events: {
      title: "Sự kiện",
      lead: "Rap show, late session, watch party. Lịch chính thức của nhà - poster rõ, giờ rõ.",
      asideMain: "Upcoming & archive",
      asideSub: "Mỹ An · Đà Nẵng",
      upcoming: "Sắp diễn ra",
      upcomingSupport: "Những đêm sắp mở sàn tại",
      empty:
        "Hiện chưa có show sắp tới trên hệ thống. Follow Facebook để không bỏ lỡ drop tiếp theo.",
      openFacebook: "Mở Facebook",
      past: "Đã qua",
      pastSupport: "Archive nights - giữ vibe nhà.",
      upcomingBadge: "Sắp diễn ra",
      pastBadge: "Đã qua",
    },
    promos: {
      title: "Khuyến mãi",
      lead: "Ưu đãi đang hiệu lực tại quán - rõ ràng, không bị trôi trong feed.",
      asideMain: "Active now",
      empty: "Hiện chưa có promo active. Ghé quán hoặc check Facebook.",
      contact: "Liên hệ",
      facebook: "Facebook",
    },
    contact: {
      title: "Liên hệ",
      lead: "Café & Bar. “A place called home”. Không gian ấm, nhạc hay, đồ uống tử tế tại Mỹ An.",
      address: "Địa chỉ",
      hours: "Giờ mở cửa",
      vibe: "Không khí",
      vibeValue: "Chillin’ & Warm Space · Good Music · Good Drinks",
      openMaps: "Mở Google Maps",
      facebook: "Facebook NHÀ Bar",
      mapTitle: "Bản đồ NHÀ Bar",
      bandLabel: "Ghé nhà",
      bandTitle: "Mỹ An · Đà Nẵng",
      bandSupport: "Café ban ngày, bar về đêm. Follow drop trên Facebook hoặc xem lịch show.",
      seeEvents: "Xem sự kiện",
    },
    footer: {
      facebook: "Facebook NHÀ Bar",
      city: "Mỹ An · Đà Nẵng",
    },
    eventDetail: {
      label: "Sự kiện",
      allEvents: "Tất cả sự kiện",
      visitVenue: "Đến quán",
      lineup: "Lineup",
      gallery: "Hình ảnh",
      offers: "Ưu đãi đêm này",
      back: "← Về lịch sự kiện",
      when: "Thời gian",
      where: "Địa điểm",
      host: "Đồng hành",
    },
    system: {
      errorKicker: "Lỗi tạm thời",
      errorTitle: "Có lỗi xảy ra",
      errorLead: "Thử tải lại trang. Nếu vẫn lỗi, quay về trang chủ.",
      retry: "Thử lại",
      home: "Về trang chủ",
      notFoundKicker: "404",
      notFoundTitle: "Không tìm thấy",
      notFoundLead:
        "Trang hoặc sự kiện này không tồn tại / chưa được publish. Quay về nhà hoặc xem lịch show.",
      viewEvents: "Xem sự kiện",
      contact: "Liên hệ quán",
    },
    ticker: [
      "CAFÉ & BAR",
      "A PLACE CALLED HOME",
      "GOOD MUSIC",
      "GOOD DRINKS",
      "CHILLIN’ & WARM SPACE",
      "35 NGÕ THÌ SĨ, MỸ AN, ĐÀ NẴNG",
      "11:00 – LATE",
    ],
  },
  en: {
    nav: {
      home: "Home",
      events: "Events",
      promos: "Promos",
      menu: "Menu",
      contact: "Contact",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary navigation",
    language: "Language",
    skipLink: "Skip to content",
    directions: "Directions",
    menuKicker: "NHÀ · Menu",
    cafeBarMyAn: "Café & Bar · Mỹ An",
    posterAlt: "Poster",
    navSideLeft: "left",
    navSideRight: "right",
    venue: {
      tagline: "A place called home",
      supportLine: "Chillin’ & Warm Space · Good Music · Good Drinks",
      hoursLabel: "11:00 AM – Late",
    },
    hero: {
      location: "Café & Bar · Mỹ An, Da Nang",
      viewEvents: "See events",
      visitVenue: "Find us",
      scenes: ["Late lights", "Good Music", "Good Drinks"],
    },
    vibe: {
      title: "Three house rhythms",
      support: "Chill by day, turn up at night — always home.",
      pillars: [
        {
          label: "Chillin’ & Warm Space",
          text: "Warm seats, low lights — stay as long as you like.",
        },
        {
          label: "Good Music",
          text: "Late sessions, rap nights, underground pulse.",
        },
        {
          label: "Good Drinks",
          text: "Clear flavors — soft daytime, night energy.",
        },
      ],
    },
    featured: {
      title: "Coming to the floor",
      support: "Main house shows — poster, time, lineup in one place.",
      blurb: "Underground night in Mỹ An — arrive early to chill, night kicks in.",
      details: "Show details",
      offerLabel: "Tonight’s offer",
    },
    home: {
      promoTitle: "House offers",
      promoSupport: "Live promos — clear, not buried in the feed.",
      allPromos: "All promos",
      promoEmpty:
        "No active offer yet. Follow Facebook or ask the bartender in-house.",
      promoEyebrow: "Promo",
      galleryTitle: "House atmosphere",
      gallerySupport: "Warm lights, late nights in Mỹ An.",
      galleryShots: [
        "Warm lights · NHÀ Bar",
        "Crowd · late session",
        "Drinks · bar top",
        "Pour night · house glass",
        "Door mark · 35 Ngõ Thì Sĩ",
        "Floor glow · late set",
      ],
      ctaSupport: "Café by day, bar by night. A place called home.",
      eventSchedule: "Event schedule",
      menuTitle: "House menu",
      menuSupport: "A taste — café by day, pours by night. Full list on Menu.",
      menuCta: "See full menu",
      upcomingTitle: "Coming up",
      upcomingSupport: "The next nights on the floor — save the dates, don’t miss the drop.",
      allEvents: "All events",
    },
    quotes: {
      title: "Words from the house",
      support: "A few lines left behind after nights at NHÀ.",
      items: [
        {
          text: "Stayed from afternoon till late and never got bored — warm light, music low enough to still talk.",
          author: "Minh Trí",
          detail: "Regular · Mỹ An",
        },
        {
          text: "Saturday late sessions are the reason I stayed in Da Nang longer than planned.",
          author: "Egor",
          detail: "Expat · 6 months in Da Nang",
        },
        {
          text: "Exactly “a place called home” — didn’t know what to order, the bartender nailed it.",
          author: "Thanh Hằng",
          detail: "First visit, back three times",
        },
      ],
    },
    menuPage: {
      title: "Menu",
      lead: "Curated list — café, signature pours, late bites. Prices are a guide; ask the bartender to order.",
      asideMain: "House list",
      note: "Items and prices may change by day. Ask the bartender to order.",
      signature: "House pick",
      itemsUnit: "items",
    },
    events: {
      title: "Events",
      lead: "Rap shows, late sessions, watch parties. Official house calendar — clear posters, clear times.",
      asideMain: "Upcoming & archive",
      asideSub: "Mỹ An · Da Nang",
      upcoming: "Upcoming",
      upcomingSupport: "Nights about to open at",
      empty:
        "No upcoming shows on the system yet. Follow Facebook so you don’t miss the next drop.",
      openFacebook: "Open Facebook",
      past: "Past",
      pastSupport: "Archive nights — keep the house vibe.",
      upcomingBadge: "Upcoming",
      pastBadge: "Past",
    },
    promos: {
      title: "Promotions",
      lead: "Active offers at the venue — clear, not lost in the feed.",
      asideMain: "Active now",
      empty: "No active promo yet. Visit the bar or check Facebook.",
      contact: "Contact",
      facebook: "Facebook",
    },
    contact: {
      title: "Contact",
      lead: "Café & Bar. “A place called home”. Warm space, good music, honest drinks in Mỹ An.",
      address: "Address",
      hours: "Hours",
      vibe: "Vibe",
      vibeValue: "Chillin’ & Warm Space · Good Music · Good Drinks",
      openMaps: "Open Google Maps",
      facebook: "NHÀ Bar on Facebook",
      mapTitle: "NHÀ Bar map",
      bandLabel: "Come over",
      bandTitle: "Mỹ An · Da Nang",
      bandSupport: "Café by day, bar by night. Follow drops on Facebook or check the show calendar.",
      seeEvents: "See events",
    },
    footer: {
      facebook: "NHÀ Bar on Facebook",
      city: "Mỹ An · Da Nang",
    },
    eventDetail: {
      label: "Event",
      allEvents: "All events",
      visitVenue: "Find us",
      lineup: "Lineup",
      gallery: "Gallery",
      offers: "Tonight’s offers",
      back: "← Back to events",
      when: "When",
      where: "Where",
      host: "With",
    },
    system: {
      errorKicker: "Temporary issue",
      errorTitle: "Something went wrong",
      errorLead: "Try reloading the page. If it persists, head back home.",
      retry: "Try again",
      home: "Back home",
      notFoundKicker: "404",
      notFoundTitle: "Not found",
      notFoundLead:
        "This page or event doesn’t exist / isn’t published yet. Head home or check the show calendar.",
      viewEvents: "See events",
      contact: "Contact the bar",
    },
    ticker: [
      "CAFÉ & BAR",
      "A PLACE CALLED HOME",
      "GOOD MUSIC",
      "GOOD DRINKS",
      "CHILLIN’ & WARM SPACE",
      "35 NGO THI SI, MY AN, DA NANG",
      "11:00 AM – LATE",
    ],
  },
  ru: {
    nav: {
      home: "Главная",
      events: "События",
      promos: "Акции",
      menu: "Меню",
      contact: "Контакты",
    },
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    primaryNav: "Основная навигация",
    language: "Язык",
    skipLink: "Перейти к содержимому",
    directions: "Маршрут",
    menuKicker: "NHÀ · Меню",
    cafeBarMyAn: "Café & Bar · Mỹ An",
    posterAlt: "Афиша",
    navSideLeft: "слева",
    navSideRight: "справа",
    venue: {
      tagline: "A place called home",
      supportLine: "Chillin’ & Warm Space · Good Music · Good Drinks",
      hoursLabel: "11:00 – Late",
    },
    hero: {
      location: "Café & Bar · Mỹ An, Дананг",
      viewEvents: "События",
      visitVenue: "Как добраться",
      scenes: ["Ночные огни", "Good Music", "Good Drinks"],
    },
    vibe: {
      title: "Три ритма дома",
      support: "Днём chill, ночью энергия — всегда как дома.",
      pillars: [
        {
          label: "Chillin’ & Warm Space",
          text: "Тёплые места, мягкий свет — можно сидеть долго.",
        },
        {
          label: "Good Music",
          text: "Late session, rap night, underground-пульс.",
        },
        {
          label: "Good Drinks",
          text: "Чистый вкус — спокойный день, яркая ночь.",
        },
      ],
    },
    featured: {
      title: "Скоро на сцене",
      support: "Главные шоу дома — афиша, время и lineup в одном месте.",
      blurb: "Underground night в Mỹ An — приходите раньше chill, ночь набирает темп.",
      details: "Подробнее",
      offerLabel: "Акция вечера",
    },
    home: {
      promoTitle: "Акции в баре",
      promoSupport: "Актуальные предложения — ясно, не теряются в ленте.",
      allPromos: "Все акции",
      promoEmpty:
        "Пока нет активных акций. Следите за Facebook или спросите бармена в доме.",
      promoEyebrow: "Акция",
      galleryTitle: "Атмосфера дома",
      gallerySupport: "Тёплый свет и поздние ночи в Mỹ An.",
      galleryShots: [
        "Тёплый свет · NHÀ Bar",
        "Crowd · late session",
        "Drinks · бар",
        "Pour night · бокал дома",
        "Дверь NHÀ · 35 Ngõ Thì Sĩ",
        "Floor glow · late set",
      ],
      ctaSupport: "Кафе днём, бар ночью. A place called home.",
      eventSchedule: "Афиша",
      menuTitle: "Меню дома",
      menuSupport: "Вкус — кафе днём, pours ночью. Полный список в Меню.",
      menuCta: "Полное меню",
      upcomingTitle: "Скоро на сцене",
      upcomingSupport: "Ближайшие вечера — сохраните даты, чтобы не пропустить.",
      allEvents: "Все события",
    },
    quotes: {
      title: "Слова из дома",
      support: "Несколько строк после ночей в NHÀ.",
      items: [
        {
          text: "Сидел с обеда до поздней ночи и не заскучал — тёплый свет, музыка не мешает разговору.",
          author: "Minh Trí",
          detail: "Постоянный гость · Mỹ An",
        },
        {
          text: "Субботние late sessions — причина, по которой я остался в Дананге дольше, чем планировал.",
          author: "Egor",
          detail: "Экспат · 6 месяцев в Дананге",
        },
        {
          text: "Точно «a place called home» — не знала, что заказать, бармен угадал сразу.",
          author: "Thanh Hằng",
          detail: "Первый визит — вернулась трижды",
        },
      ],
    },
    menuPage: {
      title: "Меню",
      lead: "Curated list — кафе, signature pours, late bites. Цены ориентировочные; заказывайте у бармена.",
      asideMain: "House list",
      note: "Позиции и цены могут меняться. Спрашивайте бармена при заказе.",
      signature: "Выбор дома",
      itemsUnit: "позиций",
    },
    events: {
      title: "События",
      lead: "Rap show, late session, watch party. Официальный календарь — понятные афиши и время.",
      asideMain: "Скоро и архив",
      asideSub: "Mỹ An · Дананг",
      upcoming: "Скоро",
      upcomingSupport: "Ближайшие вечера на",
      empty:
        "Пока нет ближайших шоу в системе. Следите за Facebook, чтобы не пропустить следующий drop.",
      openFacebook: "Открыть Facebook",
      past: "Прошедшие",
      pastSupport: "Архив ночей — сохраняем vibe дома.",
      upcomingBadge: "Скоро",
      pastBadge: "Прошло",
    },
    promos: {
      title: "Акции",
      lead: "Действующие предложения в баре — ясно и без шума ленты.",
      asideMain: "Сейчас",
      empty: "Пока нет активных акций. Загляните в бар или проверьте Facebook.",
      contact: "Контакты",
      facebook: "Facebook",
    },
    contact: {
      title: "Контакты",
      lead: "Café & Bar. «A place called home». Тёплое пространство, хорошая музыка и честные напитки в Mỹ An.",
      address: "Адрес",
      hours: "Часы работы",
      vibe: "Атмосфера",
      vibeValue: "Chillin’ & Warm Space · Good Music · Good Drinks",
      openMaps: "Открыть Google Maps",
      facebook: "NHÀ Bar в Facebook",
      mapTitle: "Карта NHÀ Bar",
      bandLabel: "Заходите",
      bandTitle: "Mỹ An · Дананг",
      bandSupport: "Кафе днём, бар ночью. Следите за дропами в Facebook или смотрите афишу.",
      seeEvents: "События",
    },
    footer: {
      facebook: "NHÀ Bar в Facebook",
      city: "Mỹ An · Дананг",
    },
    eventDetail: {
      label: "Событие",
      allEvents: "Все события",
      visitVenue: "Как добраться",
      lineup: "Состав",
      gallery: "Галерея",
      offers: "Акции вечера",
      back: "← К афише",
      when: "Когда",
      where: "Где",
      host: "Вместе с",
    },
    system: {
      errorKicker: "Временный сбой",
      errorTitle: "Что-то пошло не так",
      errorLead: "Обновите страницу. Если ошибка останется — вернитесь на главную.",
      retry: "Повторить",
      home: "На главную",
      notFoundKicker: "404",
      notFoundTitle: "Не найдено",
      notFoundLead:
        "Страница или событие не существует / ещё не опубликовано. Вернитесь домой или откройте афишу.",
      viewEvents: "События",
      contact: "Связаться с баром",
    },
    ticker: [
      "CAFÉ & BAR",
      "A PLACE CALLED HOME",
      "GOOD MUSIC",
      "GOOD DRINKS",
      "CHILLIN’ & WARM SPACE",
      "35 NGO THI SI, MY AN, DA NANG",
      "11:00 – LATE",
    ],
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "vi" || value === "en" || value === "ru";
}

export function getUi(locale: Locale): UiCopy {
  return UI[locale];
}
