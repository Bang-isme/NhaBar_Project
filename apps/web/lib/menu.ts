import type { Locale } from "./i18n";

export type MenuItem = {
  name: string;
  note?: string;
  priceHint?: string;
  /** House pick — highlighted on the board. */
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  support: string;
  items: MenuItem[];
};

const MENU: Record<Locale, MenuCategory[]> = {
  vi: [
    {
      id: "cafe",
      title: "Café ban ngày",
      support: "Ngồi lâu, ánh đèn ấm — trước khi sàn bật.",
      items: [
        { name: "Espresso / Americano", note: "Đậm, sạch", priceHint: "35k" },
        {
          name: "Cà phê sữa đá",
          note: "House classic",
          priceHint: "32k",
          signature: true,
        },
        { name: "Bạc xỉu nóng", note: "Béo nhẹ, ít đắng", priceHint: "38k" },
        { name: "Trà đào / Trà vải", note: "Nhẹ, ngồi chill", priceHint: "45k" },
        { name: "Matcha latte", note: "Đá hoặc nóng", priceHint: "55k" },
      ],
    },
    {
      id: "pours",
      title: "Signature pours",
      support: "Good Drinks — rõ vị, không phô.",
      items: [
        {
          name: "House Highball",
          note: "Whisky · soda · citrus",
          priceHint: "95k",
        },
        {
          name: "NHÀ Sour",
          note: "Whisky · chanh vàng · cân bằng",
          priceHint: "120k",
          signature: true,
        },
        { name: "Ember Negroni", note: "Đắng ấm, vị khói nhẹ", priceHint: "135k" },
        { name: "Mỹ An Mule", note: "Gừng tươi · lime", priceHint: "110k" },
        {
          name: "Shot flight ×3",
          note: "Hỏi bartender theo đêm",
          priceHint: "150k",
        },
      ],
    },
    {
      id: "bites",
      title: "Late bites",
      support: "Đồ ăn nhẹ khi night dài.",
      items: [
        { name: "Khoai chiên trộn phô mai", note: "Chia bàn", priceHint: "65k" },
        {
          name: "Nem chua rán",
          note: "Ăn kèm tương ớt nhà",
          priceHint: "55k",
          signature: true,
        },
        { name: "Bar snacks mix", note: "Muối · giòn", priceHint: "45k" },
      ],
    },
    {
      id: "beer",
      title: "Beer & soft",
      support: "Cold cans · soft cho crew.",
      items: [
        { name: "Larue / Saigon lạnh", note: "Chai · lon", priceHint: "25k" },
        { name: "Craft can tuần này", note: "Hỏi quầy", priceHint: "75k" },
        { name: "Soft drinks / nước suối", note: "No ABV", priceHint: "20k" },
      ],
    },
  ],
  en: [
    {
      id: "cafe",
      title: "Daytime café",
      support: "Stay long under warm light — before the floor turns up.",
      items: [
        { name: "Espresso / Americano", note: "Bold, clean", priceHint: "35k" },
        {
          name: "Iced milk coffee",
          note: "House classic",
          priceHint: "32k",
          signature: true,
        },
        { name: "Hot bạc xỉu", note: "Milky, low bitter", priceHint: "38k" },
        { name: "Peach / lychee tea", note: "Soft chill", priceHint: "45k" },
        { name: "Matcha latte", note: "Iced or hot", priceHint: "55k" },
      ],
    },
    {
      id: "pours",
      title: "Signature pours",
      support: "Good Drinks — clear flavor, no fluff.",
      items: [
        {
          name: "House Highball",
          note: "Whisky · soda · citrus",
          priceHint: "95k",
        },
        {
          name: "NHÀ Sour",
          note: "Whisky · lemon · balanced",
          priceHint: "120k",
          signature: true,
        },
        { name: "Ember Negroni", note: "Warm bitter, light smoke", priceHint: "135k" },
        { name: "Mỹ An Mule", note: "Fresh ginger · lime", priceHint: "110k" },
        {
          name: "Shot flight ×3",
          note: "Ask the bartender tonight",
          priceHint: "150k",
        },
      ],
    },
    {
      id: "bites",
      title: "Late bites",
      support: "Light plates for long nights.",
      items: [
        { name: "Cheese loaded fries", note: "Table share", priceHint: "65k" },
        {
          name: "Fried nem chua",
          note: "House chili dip",
          priceHint: "55k",
          signature: true,
        },
        { name: "Bar snacks mix", note: "Salt · crunch", priceHint: "45k" },
      ],
    },
    {
      id: "beer",
      title: "Beer & soft",
      support: "Cold cans · soft for the crew.",
      items: [
        { name: "Larue / Saigon, cold", note: "Bottle · can", priceHint: "25k" },
        { name: "Craft can of the week", note: "Ask the bar", priceHint: "75k" },
        { name: "Soft drinks / water", note: "No ABV", priceHint: "20k" },
      ],
    },
  ],
  ru: [
    {
      id: "cafe",
      title: "Кафе днём",
      support: "Сидите долго при мягком свете — до ночного темпа.",
      items: [
        { name: "Espresso / Americano", note: "Плотный, чистый", priceHint: "35k" },
        {
          name: "Iced milk coffee",
          note: "House classic",
          priceHint: "32k",
          signature: true,
        },
        { name: "Горячий bạc xỉu", note: "Мягкий, сливочный", priceHint: "38k" },
        { name: "Персиковый / личи чай", note: "Мягкий chill", priceHint: "45k" },
        { name: "Matcha latte", note: "Со льдом или горячий", priceHint: "55k" },
      ],
    },
    {
      id: "pours",
      title: "Signature pours",
      support: "Good Drinks — чистый вкус.",
      items: [
        {
          name: "House Highball",
          note: "Whisky · soda · citrus",
          priceHint: "95k",
        },
        {
          name: "NHÀ Sour",
          note: "Whisky · лимон · баланс",
          priceHint: "120k",
          signature: true,
        },
        { name: "Ember Negroni", note: "Тёплая горечь, лёгкий дым", priceHint: "135k" },
        { name: "Mỹ An Mule", note: "Свежий имбирь · лайм", priceHint: "110k" },
        {
          name: "Shot flight ×3",
          note: "Спросите бармена",
          priceHint: "150k",
        },
      ],
    },
    {
      id: "bites",
      title: "Late bites",
      support: "Лёгкие закуски для длинной ночи.",
      items: [
        { name: "Картофель фри с сыром", note: "На стол", priceHint: "65k" },
        {
          name: "Жареный nem chua",
          note: "Домашний чили-соус",
          priceHint: "55k",
          signature: true,
        },
        { name: "Bar snacks mix", note: "Соль · хруст", priceHint: "45k" },
      ],
    },
    {
      id: "beer",
      title: "Beer & soft",
      support: "Холодные банки · soft для компании.",
      items: [
        { name: "Larue / Saigon, холодное", note: "Бутылка · банка", priceHint: "25k" },
        { name: "Крафт недели", note: "Спросите у бара", priceHint: "75k" },
        { name: "Soft drinks / вода", note: "No ABV", priceHint: "20k" },
      ],
    },
  ],
};

/** Home teaser shows first three categories only. */
export function getMenuTeaser(locale: Locale): MenuCategory[] {
  return MENU[locale].slice(0, 3);
}

export function getFullMenu(locale: Locale): MenuCategory[] {
  return MENU[locale];
}
