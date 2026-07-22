import { BrandHero } from "@/components/BrandHero";
import { FeaturedEvent } from "@/components/FeaturedEvent";
import { VibeStrip } from "@/components/VibeStrip";
import { HomeMenuTeaser } from "@/components/HomeMenuTeaser";
import { HomeUpcomingStrip } from "@/components/HomeUpcomingStrip";
import { HomeQuotes } from "@/components/HomeQuotes";
import { HomeLocalizedSections } from "@/components/HomeLocalizedSections";
import { HomeCtaBand } from "@/components/HomeCtaBand";
import { getActivePromotions, getEvents, getFeaturedEvent } from "@/lib/api";

export default async function HomePage() {
  const [featured, upcoming, promotions] = await Promise.all([
    getFeaturedEvent(),
    getEvents("upcoming"),
    getActivePromotions(),
  ]);
  const topPromos = promotions.slice(0, 2);
  const nextNights = upcoming
    .filter((event) => event.slug !== featured.slug)
    .slice(0, 3);

  return (
    <div className="page-screen">
      <BrandHero />

      <div className="container stack-page">
        <VibeStrip />
        <FeaturedEvent event={featured} />
        <HomeUpcomingStrip events={nextNights} />
        <HomeMenuTeaser />
        <HomeLocalizedSections promos={topPromos} />
        <HomeQuotes />
        <HomeCtaBand />
      </div>
    </div>
  );
}
