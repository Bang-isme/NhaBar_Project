"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AdminArtist,
  AdminEvent,
  createAdminEvent,
  listAdminArtists,
  listAdminEvents,
  replaceEventLineup,
  updateAdminEvent,
} from "@/lib/admin-api";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [artists, setArtists] = useState<AdminArtist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "hidden">(
    "draft",
  );
  const [description, setDescription] = useState("");
  const [lineupArtistId, setLineupArtistId] = useState("");
  const [lineupRole, setLineupRole] = useState("DJ");

  const selected = useMemo(
    () => events.find((e) => e.id === selectedId) ?? null,
    [events, selectedId],
  );

  async function refresh() {
    const [eventRows, artistRows] = await Promise.all([
      listAdminEvents(),
      listAdminArtists(),
    ]);
    setEvents(eventRows);
    setArtists(artistRows);
    if (!lineupArtistId && artistRows[0]) {
      setLineupArtistId(artistRows[0].id);
    }
  }

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [eventRows, artistRows] = await Promise.all([
          listAdminEvents(),
          listAdminArtists(),
        ]);
        if (!active) return;
        setEvents(eventRows);
        setArtists(artistRows);
        if (artistRows[0]) setLineupArtistId(artistRows[0].id);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Load failed");
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await createAdminEvent({
        title,
        slug: slug || slugify(title),
        startsAt: new Date(startsAt).toISOString(),
        status,
        description,
        isFeatured: false,
      });
      setTitle("");
      setSlug("");
      setDescription("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    }
  }

  async function setEventStatus(
    id: string,
    next: "draft" | "published" | "hidden",
  ) {
    setError(null);
    try {
      await updateAdminEvent(id, { status: next });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function addToLineup() {
    if (!selected || !lineupArtistId) return;
    setError(null);
    try {
      const current = (selected.lineup ?? []).map((row, index) => ({
        artistId: row.artistId ?? row.artist.id,
        roleLabel: row.roleLabel,
        sortOrder: row.sortOrder ?? index + 1,
      }));
      current.push({
        artistId: lineupArtistId,
        roleLabel: lineupRole,
        sortOrder: current.length + 1,
      });
      await replaceEventLineup(selected.id, current);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lineup failed");
    }
  }

  return (
    <div className="admin-grid admin-page">
      <section>
        <header className="admin-header-flex">
          <div>
            <p className="section-label">Manage</p>
            <h1 className="section-title">Sự kiện</h1>
          </div>
        </header>

        {error ? <p className="admin-error">{error}</p> : null}

        <form className="admin-form" onSubmit={onCreate}>
          <h2 className="section-label">Tạo sự kiện</h2>
          <label>
            Tiêu đề
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(slugify(e.target.value));
              }}
              required
            />
          </label>
          <label>
            Slug
            <input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </label>
          <label>
            Starts at
            <input
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              required
            />
          </label>
          <label>
            Status
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "draft" | "published" | "hidden")
              }
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="hidden">hidden</option>
            </select>
          </label>
          <label>
            Mô tả
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>
          <button type="submit" className="btn-primary">
            Tạo
          </button>
        </form>
      </section>

      <section className="admin-list">
        <h2 className="section-label">Danh sách</h2>
        <ul className="admin-event-list">
          {events.map((event) => (
            <li key={event.id}>
              <button
                type="button"
                className={
                  selectedId === event.id
                    ? "admin-event-item is-active"
                    : "admin-event-item"
                }
                onClick={() => setSelectedId(event.id)}
              >
                <strong>{event.title}</strong>
                <span>
                  {event.status} · {new Date(event.startsAt).toLocaleString("vi-VN")}
                </span>
              </button>
              <div className="admin-event-actions">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setEventStatus(event.id, "published")}
                >
                  Publish
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setEventStatus(event.id, "hidden")}
                >
                  Ẩn
                </button>
              </div>
            </li>
          ))}
        </ul>

        {selected ? (
          <div className="admin-lineup-panel">
            <h3 className="section-label">Lineup — {selected.title}</h3>
            <ul className="lineup__list">
              {(selected.lineup ?? []).map((row) => (
                <li key={row.id}>
                  <span className="lineup__name">{row.artist.stageName}</span>
                  <span className="lineup__role">{row.roleLabel}</span>
                </li>
              ))}
            </ul>
            <div className="admin-lineup-form">
              <select
                value={lineupArtistId}
                onChange={(e) => setLineupArtistId(e.target.value)}
              >
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.stageName}
                  </option>
                ))}
              </select>
              <input
                value={lineupRole}
                onChange={(e) => setLineupRole(e.target.value)}
                placeholder="Role"
              />
              <button type="button" className="btn-primary" onClick={addToLineup}>
                Gắn nghệ sĩ
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
