import Image from "next/image";
import Link from "next/link";

type Props = {
  size?: "sm" | "md" | "nav" | "lg";
  href?: string;
  showWordmark?: boolean;
  priority?: boolean;
};

const sizes = {
  sm: 40,
  md: 48,
  nav: 52,
  lg: 360,
};

export function BrandLogo({
  size = "md",
  href,
  showWordmark = true,
  priority = false,
}: Props) {
  const resolvedHref = href === undefined && size !== "lg" ? "/" : href;
  const px = sizes[size];
  const mark = (
    <>
      <Image
        src="/logo-nha-bar-clean.png"
        alt="NHÀ Bar"
        width={px}
        height={px}
        className={
          size === "lg"
            ? "hero-logo"
            : size === "nav"
              ? "brand-mark__logo brand-mark__logo--nav"
              : "brand-mark__logo"
        }
        priority={priority}
      />
      {showWordmark && size !== "lg" ? (
        <span
          className={
            size === "nav" ? "brand-mark__word brand-mark__word--nav" : "brand-mark__word"
          }
        >
          <span>NHÀ</span>
          <span>BAR</span>
        </span>
      ) : null}
    </>
  );

  if (resolvedHref) {
    return (
      <Link
        href={resolvedHref}
        className={size === "nav" ? "brand-mark brand-mark--nav" : "brand-mark"}
        aria-label="NHÀ Bar"
      >
        {mark}
      </Link>
    );
  }

  return (
    <div
      className={
        size === "lg"
          ? undefined
          : size === "nav"
            ? "brand-mark brand-mark--nav"
            : "brand-mark"
      }
    >
      {mark}
    </div>
  );
}
