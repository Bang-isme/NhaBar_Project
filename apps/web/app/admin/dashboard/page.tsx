"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  listAdminEvents,
  listAdminMenuItems,
  type AdminEvent,
  type AdminMenuItem,
} from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [menuItems, setMenuItems] = useState<AdminMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      listAdminEvents().catch(() => []),
      listAdminMenuItems().catch(() => []),
    ]).then(([evts, items]) => {
      setEvents(evts);
      setMenuItems(items);
      setLoading(false);
    });
  }, []);

  const totalEvents = events.length;
  const publishedEvents = events.filter((e) => e.status === "published").length;
  const totalMenuItems = menuItems.length;
  const soldOutItems = menuItems.filter((i) => !i.isAvailable).length;

  if (loading) {
    return (
      <div className="admin-page">
        <div className="skeleton skeleton--line" />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header-flex">
        <div>
          <h1 className="section-title">Bar Operations Dashboard</h1>
          <p className="section-support">
            Tổng quan sự kiện và thực đơn đồ uống NHÀ Bar
          </p>
        </div>
      </div>

      <div className="admin-card-stats">
        <div className="stat-box">
          <div className="stat-number">{publishedEvents}</div>
          <div className="stat-label">
            Sự kiện đã publish ({totalEvents} tổng)
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{totalMenuItems}</div>
          <div className="stat-label">Món trong menu</div>
        </div>
        <div className="stat-box">
          <div
            className="stat-number"
            style={soldOutItems > 0 ? { color: "var(--danger)" } : undefined}
          >
            {soldOutItems}
          </div>
          <div className="stat-label">Món đang báo hết hàng</div>
        </div>
      </div>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Sự kiện & DJ lineup</h3>
          <p className="text-muted">
            Tạo sự kiện mới, gán set biểu diễn của các DJ / artist.
          </p>
          <Link href="/admin/events" className="btn-primary">
            <span className="btn__label">Quản lý sự kiện</span>
            <span className="btn__icon" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        <div className="admin-card">
          <h3>Menu CMS & sold-out</h3>
          <p className="text-muted">
            Điều chỉnh giá, cập nhật hương vị và bật/tắt trạng thái hết hàng.
          </p>
          <Link href="/admin/menu" className="btn-primary">
            <span className="btn__label">Quản lý thực đơn</span>
            <span className="btn__icon" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
