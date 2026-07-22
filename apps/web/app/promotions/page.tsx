import type { Metadata } from "next";
import { PromotionsView } from "@/components/PromotionsView";
import { getActivePromotions } from "@/lib/api";

export const metadata: Metadata = {
  title: "Khuyến mãi",
  description: "Ưu đãi đang chạy tại NHÀ Bar Đà Nẵng.",
};

export default async function PromotionsPage() {
  const promotions = await getActivePromotions();
  return <PromotionsView promotions={promotions} />;
}
