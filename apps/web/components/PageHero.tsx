import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

type Props = {
  title: string;
  lead: string;
  aside?: ReactNode;
};

export function PageHero({ title, lead, aside }: Props) {
  return (
    <header className="page-hero">
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
