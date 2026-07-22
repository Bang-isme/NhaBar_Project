import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function PrimaryButton({
  href,
  children,
  variant = "primary",
}: Props) {
  const className =
    variant === "primary" ? "btn-primary group" : "btn-ghost group";
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__icon" aria-hidden="true">
        ↗
      </span>
    </>
  );
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {inner}
    </Link>
  );
}
