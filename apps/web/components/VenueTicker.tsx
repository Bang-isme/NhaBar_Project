"use client";

import { KineticTicker } from "@/components/motion/KineticTicker";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  embedded?: boolean;
};

export function VenueTicker({ embedded = false }: Props) {
  const { ui } = useLocale();
  return <KineticTicker items={ui.ticker} embedded={embedded} />;
}
