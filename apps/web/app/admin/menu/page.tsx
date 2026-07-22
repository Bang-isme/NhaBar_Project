"use client";

import { useCallback, useEffect, useState } from "react";
import {
  listAdminMenuItems,
  createAdminMenuItem,
  updateAdminMenuItem,
  deleteAdminMenuItem,
  type AdminMenuItem,
} from "@/lib/admin-api";
import { getMenuCategories, type MenuCategoryData } from "@/lib/api";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: 120000,
  flavorProfile: "",
  abv: "",
  isAvailable: true,
  isBestSeller: false,
  categoryId: "",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<AdminMenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const loadData = useCallback(async () => {
    setError(null);
    try {
      const [itms, cats] = await Promise.all([
        listAdminMenuItems(),
        getMenuCategories(),
      ]);
      setItems(itms);
      setCategories(cats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggle = async (
    item: AdminMenuItem,
    patch: Partial<Pick<AdminMenuItem, "isAvailable" | "isBestSeller">>,
  ) => {
    setError(null);
    try {
      const updated = await updateAdminMenuItem(item.id, patch);
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, ...updated } : i)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa món này?")) return;
    setError(null);
    try {
      await deleteAdminMenuItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ ...EMPTY_FORM, categoryId: categories[0]?.id ?? "" });
    setShowModal(true);
  };

  const openEditModal = (item: AdminMenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      flavorProfile: item.flavorProfile ?? "",
      abv: item.abv ?? "",
      isAvailable: item.isAvailable,
      isBestSeller: item.isBestSeller,
      categoryId: item.categoryId,
    });
    setShowModal(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingItem) {
        await updateAdminMenuItem(editingItem.id, formData);
      } else {
        await createAdminMenuItem(formData);
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

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
          <h1 className="section-title">Quản lý thực đơn</h1>
          <p className="section-support">
            Bật/tắt sold-out và điều chỉnh giá đồ uống tức thì.
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={openAddModal}>
          <span className="btn__label">Thêm món mới</span>
          <span className="btn__icon" aria-hidden="true">
            +
          </span>
        </button>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên món</th>
              <th>Giá</th>
              <th>Hương vị / ABV</th>
              <th>Best seller</th>
              <th>Còn hàng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  {item.description ? (
                    <div className="admin-table__sub">{item.description}</div>
                  ) : null}
                </td>
                <td className="admin-table__price">{formatPrice(item.price)}</td>
                <td>
                  <span className="text-muted">
                    {item.flavorProfile || "—"}
                    {item.abv ? ` · ABV ${item.abv}` : ""}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className={
                      item.isBestSeller ? "pill-toggle is-on" : "pill-toggle"
                    }
                    aria-pressed={item.isBestSeller}
                    onClick={() =>
                      handleToggle(item, { isBestSeller: !item.isBestSeller })
                    }
                  >
                    {item.isBestSeller ? "★ Best seller" : "Bình thường"}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={
                      item.isAvailable
                        ? "pill-toggle pill-toggle--state is-on"
                        : "pill-toggle pill-toggle--state is-off"
                    }
                    aria-pressed={item.isAvailable}
                    onClick={() =>
                      handleToggle(item, { isAvailable: !item.isAvailable })
                    }
                  >
                    {item.isAvailable ? "● Phục vụ" : "✕ Sold out"}
                  </button>
                </td>
                <td>
                  <div className="admin-actions">
                    <button
                      type="button"
                      className="btn-ghost btn-ghost--sm"
                      onClick={() => openEditModal(item)}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="btn-ghost btn-ghost--sm btn-ghost--danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <span className="text-muted">
                    Chưa có món nào. Bấm “Thêm món mới” để bắt đầu.
                  </span>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div
          className="admin-modal"
          role="dialog"
          aria-modal="true"
          aria-label={editingItem ? "Sửa món" : "Thêm món mới"}
        >
          <div className="admin-modal__panel">
            <h2>{editingItem ? "Sửa món đồ uống" : "Thêm món đồ uống mới"}</h2>
            <form className="admin-form" onSubmit={handleSubmitForm}>
              <label>
                Danh mục
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Tên món
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Giá (VND)
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  required
                />
              </label>
              <label>
                Profile hương vị
                <input
                  type="text"
                  placeholder="Sweet, Citrus, Smoky…"
                  value={formData.flavorProfile}
                  onChange={(e) =>
                    setFormData({ ...formData, flavorProfile: e.target.value })
                  }
                />
              </label>
              <label>
                Nồng độ ABV
                <input
                  type="text"
                  placeholder="18%"
                  value={formData.abv}
                  onChange={(e) =>
                    setFormData({ ...formData, abv: e.target.value })
                  }
                />
              </label>
              <label>
                Mô tả ngắn
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>
              <div className="admin-actions">
                <button type="submit" className="btn-primary">
                  Lưu thông tin
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
