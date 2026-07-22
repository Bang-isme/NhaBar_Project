import { describe, it, expect } from "vitest";
import { getFullMenu, getMenuTeaser } from "./menu";

describe("menu", () => {
  it("returns three teaser categories", () => {
    expect(getMenuTeaser("vi")).toHaveLength(3);
    expect(getMenuTeaser("en")[0].title).toMatch(/café|Daytime/i);
  });

  it("full menu has four categories across locales", () => {
    expect(getFullMenu("vi")).toHaveLength(4);
    expect(getFullMenu("ru")).toHaveLength(4);
  });
});
