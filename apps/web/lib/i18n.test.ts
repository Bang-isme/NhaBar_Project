import { describe, it, expect } from "vitest";
import { isLocale, getUi } from "./i18n";

describe("i18n", () => {
  it("accepts vi en ru locales", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ru")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("returns russian nav labels", () => {
    expect(getUi("ru").nav.home).toBe("Главная");
    expect(getUi("ru").hero.viewEvents).toBe("События");
  });

  it("localizes hero scene captions", () => {
    expect(getUi("vi").hero.scenes[0]).toBe("Đèn khuya");
    expect(getUi("ru").hero.scenes[0]).toBe("Ночные огни");
    expect(getUi("en").contact.bandLabel).toBe("Come over");
  });

  it("exposes localized venue chrome", () => {
    expect(getUi("vi").venue.hoursLabel).toBe("11:00 – Late");
    expect(getUi("en").venue.hoursLabel).toBe("11:00 AM – Late");
    expect(getUi("ru").posterAlt).toBe("Афиша");
    expect(getUi("vi").eventDetail.gallery).toBe("Hình ảnh");
  });

  it("includes menu nav and offer labels", () => {
    expect(getUi("vi").nav.menu).toBe("Menu");
    expect(getUi("ru").nav.menu).toBe("Меню");
    expect(getUi("en").featured.offerLabel).toBe("Tonight’s offer");
    expect(getUi("vi").home.menuCta).toContain("menu");
  });
});
