import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

export type PageHeroVariant =
  | "events"
  | "menu"
  | "promos"
  | "contact"
  | "default";

type Props = {
  title: string;
  lead: string;
  aside?: ReactNode;
  variant?: PageHeroVariant;
  kicker?: string;
};

export function PageHero({
  title,
  lead,
  aside,
  variant = "default",
  kicker,
}: Props) {
  const variantClass =
    variant === "default" ? "page-hero" : `page-hero page-hero--${variant}`;

  return (
    <header className={variantClass}>
      {kicker ? (
        <Reveal className="page-hero__kicker" mode="rise">
          <span>{kicker}</span>
        </Reveal>
      ) : null}
      <Reveal className="page-hero__copy" mode="slide">
        <h1>{title}</h1>
        <p className="page-hero__lead">{lead}</p>
      </Reveal>
      {aside ? (
        <Reveal className="page-hero__aside" delay={0.08} mode="rise">
          {aside}
        </Reveal>
      ) : null}
      <div className="page-hero__rule" aria-hidden="true" />
    </header>
  );
}
