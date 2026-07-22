import { ContactView } from "@/components/ContactView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Địa chỉ 35 Ngõ Thì Sĩ, Mỹ An, Đà Nẵng. Giờ mở cửa 11:AM – Late.",
};

export default function ContactPage() {
  return <ContactView />;
}
