import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";

describe("design tokens", () => {
  it("defines NHÀ Bar lounge stamp palette from logo DNA", () => {
    const css = readFileSync(
      resolve(__dirname, "../app/globals.css"),
      "utf8",
    );
    expect(css).toMatch(/--bg-base:\s*#050505/i);
    expect(css).toMatch(/--accent-bronze:\s*#c19a6b/i);
    expect(css).toMatch(/--accent-signal:/i);
    expect(css).not.toContain("#7C3AED");
    expect(css).not.toContain("#3B82F6");
    expect(css).toContain("Lounge stamp");
  });
});
