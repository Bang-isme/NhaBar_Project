"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/admin-api";
import { BrandLogo } from "@/components/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@nhabar.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminLogin(email, password);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header className="page-hero admin-login">
        <BrandLogo />
        <p className="section-label admin-login__label">Admin</p>
        <h1 className="admin-login__title">Đăng nhập</h1>
        <p>Quản lý sự kiện, thực đơn và lineup NHÀ Bar.</p>

        <form className="admin-form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>
          <label>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="admin-error">{error}</p> : null}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Đang vào…" : "Đăng nhập"}
          </button>
        </form>
      </header>
    </div>
  );
}
