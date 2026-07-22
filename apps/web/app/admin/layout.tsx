"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAdminToken, getAdminToken } from "@/lib/admin-api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [isLogin, router, pathname]);

  if (!ready) {
    return (
      <div className="container admin-page">
        <div className="skeleton skeleton--line" />
      </div>
    );
  }

  if (isLogin) return children;

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/events", label: "Sự kiện" },
    { href: "/admin/menu", label: "Thực đơn" },
  ];

  return (
    <div className="container admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="section-label">NHÀ Bar CMS</p>
          <nav className="admin-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname.startsWith(link.href) ? "is-active" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/">Xem site</Link>
          </nav>
        </div>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            clearAdminToken();
            router.replace("/admin/login");
          }}
        >
          Đăng xuất
        </button>
      </header>
      {children}
    </div>
  );
}
