"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { IconClose } from "@/components/icons/AppIcons";

type GalleryCategory = "all" | "nights" | "vibe" | "cocktails";

type GalleryPhoto = {
  id: string;
  url: string;
  title: string;
  category: "nights" | "vibe" | "cocktails";
  date: string;
  caption: string;
};

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g-1",
    url: "/uploads/hero/speakeasy-bar.png",
    title: "Góc Bar Đèn Ấm",
    category: "vibe",
    date: "Đà Nẵng",
    caption: "Không gian Speakeasy mộc mạc, ánh sáng trầm áp ấm cúng.",
  },
  {
    id: "g-2",
    url: "/uploads/hero/acoustic-vinyl.png",
    title: "Đĩa Than & Âm Nhạc Unplugged",
    category: "nights",
    date: "Đêm Acoustic",
    caption: "Giai điệu mộc từ mâm đĩa than vintage và acoustic live band.",
  },
  {
    id: "g-3",
    url: "/uploads/hero/signature-cocktail.png",
    title: "Cocktail Chữ Ký NHÀ",
    category: "cocktails",
    date: "Craft Drinks",
    caption: "Tách ly nồng nàn pha chế thủ công bởi Bartender nhà.",
  },
  {
    id: "g-4",
    url: "/uploads/hero/speakeasy-bar.png",
    title: "Late Session Night",
    category: "nights",
    date: "Resident Night",
    caption: "Chill sớm, bật muộn cùng lineup local crew chất lượng.",
  },
  {
    id: "g-5",
    url: "/uploads/hero/acoustic-vinyl.png",
    title: "Góc Nhạc Cũ",
    category: "vibe",
    date: "Vibe Nhà",
    caption: "Nơi dừng chân cho những tâm hồn yêu âm nhạc sâu lắng.",
  },
  {
    id: "g-6",
    url: "/uploads/hero/signature-cocktail.png",
    title: "Whisky & Ice Craft",
    category: "cocktails",
    date: "Signature",
    caption: "Đá vắt tay thủ công kết hợp whisky tuyển chọn hảo hạng.",
  },
];

export function GalleryView() {
  const { ui } = useLocale();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [activeLightBox, setActiveLightBox] = useState<GalleryPhoto | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <div className="page-screen">
      <div className="container stack-page">
        <PageHero
          variant="events"
          kicker="NHÀ · KỶ NIỆM"
          title="THƯ VIỆN KỶ NIỆM"
          lead="Lưu giữ những khoảnh khắc, cảm xúc và đêm nhạc chill đã diễn ra tại NHÀ Bar Đà Nẵng."
          aside={
            <div className="page-hero__stamp">
              <p className="page-hero__aside-text">
                MỖI ĐÊM LÀ MỘT KỶ NIỆM
                <span>35 Ngõ Thì Sĩ · Mỹ An</span>
              </p>
            </div>
          }
        />

        <section className="gallery-page-section" aria-label="Thư viện hình ảnh">
          <Reveal className="gallery-filter-bar">
            <button
              type="button"
              className={`gallery-filter-btn${
                activeCategory === "all" ? " is-active" : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              Tất cả khoảnh khắc ({GALLERY_PHOTOS.length})
            </button>
            <button
              type="button"
              className={`gallery-filter-btn${
                activeCategory === "nights" ? " is-active" : ""
              }`}
              onClick={() => setActiveCategory("nights")}
            >
              Đêm nhạc
            </button>
            <button
              type="button"
              className={`gallery-filter-btn${
                activeCategory === "vibe" ? " is-active" : ""
              }`}
              onClick={() => setActiveCategory("vibe")}
            >
              Không khí NHÀ
            </button>
            <button
              type="button"
              className={`gallery-filter-btn${
                activeCategory === "cocktails" ? " is-active" : ""
              }`}
              onClick={() => setActiveCategory("cocktails")}
            >
              Pha chế
            </button>
          </Reveal>

          <div className="gallery-bento-grid">
            {filteredPhotos.map((photo, index) => (
              <Reveal key={photo.id} delay={index * 0.05}>
                <div
                  className="gallery-card hover-lift"
                  onClick={() => setActiveLightBox(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveLightBox(photo);
                    }
                  }}
                >
                  <div className="gallery-card__media">
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      width={600}
                      height={450}
                      className="gallery-card__img"
                    />
                    <div className="gallery-card__overlay">
                      <span className="gallery-card__tag">{photo.date}</span>
                      <h3 className="gallery-card__title">{photo.title}</h3>
                      <p className="gallery-card__caption">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {activeLightBox ? (
          <div
            className="gallery-lightbox-backdrop"
            onClick={() => setActiveLightBox(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="gallery-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setActiveLightBox(null)}
                aria-label="Đóng"
              >
                <IconClose size={16} />
              </button>
              <div className="gallery-lightbox__media">
                <Image
                  src={activeLightBox.url}
                  alt={activeLightBox.title}
                  width={1200}
                  height={800}
                  className="gallery-lightbox__img"
                />
              </div>
              <div className="gallery-lightbox__info">
                <span className="section-label">{activeLightBox.date}</span>
                <h2 className="gallery-lightbox__title">
                  {activeLightBox.title}
                </h2>
                <p className="gallery-lightbox__desc">
                  {activeLightBox.caption}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
