import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans, Outfit, Work_Sans } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SkipLink } from "@/components/SkipLink";
import "./globals.css";

/* Be Vietnam Pro: Vietnamese UI + brand (NHÀ) */
const display = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
});

/* Outfit: English UI chrome */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

/* Noto Sans: Russian (Cyrillic) UI */
const cyrillic = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cyrillic",
});

const body = Work_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "NHÀ Bar — A place called home",
    template: "%s · NHÀ Bar",
  },
  description:
    "Café & Bar underground tại Mỹ An, Đà Nẵng. Chillin’ & Warm Space · Good Music · Good Drinks. 35 Ngõ Thì Sĩ · 11:00 AM – Late.",
  openGraph: {
    title: "NHÀ Bar — A place called home",
    description: "Café & Bar tại Mỹ An, Đà Nẵng. Good music, good drinks.",
    locale: "vi_VN",
    type: "website",
    images: [{ url: "/logo-nha-bar-clean.png" }],
  },
  icons: {
    icon: "/logo-nha-bar-clean.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      data-locale="vi"
      className={`${display.variable} ${outfit.variable} ${cyrillic.variable} ${body.variable}`}
    >
      <body>
        <LocaleProvider>
          <SmoothScroll />
          <SkipLink />
          <div className="site-shell">
            <SiteHeader />
            <main id="main-content" className="site-main">
              {children}
            </main>
            <SiteFooter />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
