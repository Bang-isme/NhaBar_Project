import { GalleryView } from "@/components/GalleryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thư viện Kỷ niệm — NHÀ Bar",
  description: "Lưu giữ những khoảnh khắc, cảm xúc và đêm nhạc chill đã diễn ra tại NHÀ Bar Đà Nẵng.",
};

export default function GalleryPage() {
  return <GalleryView />;
}
