const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const TOKEN_KEY = "nhabar_admin_token";

export type AdminUser = {
  id: string;
  email: string;
  displayName: string;
  role: string;
};

export type AdminEvent = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  startsAt: string;
  status: "draft" | "published" | "hidden";
  isFeatured: boolean;
  posterUrl: string | null;
  collaborator: string | null;
  lineup?: Array<{
    id: string;
    roleLabel: string;
    sortOrder: number;
    artistId: string;
    artist: { id: string; stageName: string };
  }>;
};

export type AdminArtist = {
  id: string;
  stageName: string;
  bio: string | null;
};

export type AdminMenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  flavorProfile: string | null;
  abv: string | null;
  isAvailable: boolean;
  isBestSeller: boolean;
  categoryId: string;
  category?: { id: string; name: string };
};

export type AdminMenuItemPayload = {
  name: string;
  description?: string;
  price: number;
  flavorProfile?: string;
  abv?: string;
  isAvailable?: boolean;
  isBestSeller?: boolean;
  categoryId: string;
};

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      json?.error?.message ?? json?.message ?? `Request failed (${res.status})`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
  return json as T;
}

export async function adminLogin(email: string, password: string) {
  const json = await adminFetch<{
    data: { accessToken: string; user: AdminUser };
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAdminToken(json.data.accessToken);
  return json.data.user;
}

export async function listAdminEvents() {
  const json = await adminFetch<{ data: AdminEvent[] }>("/admin/events");
  return json.data;
}

export async function createAdminEvent(payload: {
  title: string;
  slug: string;
  description?: string;
  startsAt: string;
  status: "draft" | "published" | "hidden";
  isFeatured?: boolean;
  posterUrl?: string;
  collaborator?: string;
}) {
  const json = await adminFetch<{ data: AdminEvent }>("/admin/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return json.data;
}

export async function updateAdminEvent(
  id: string,
  payload: Partial<{
    title: string;
    description: string;
    startsAt: string;
    status: "draft" | "published" | "hidden";
    isFeatured: boolean;
    posterUrl: string;
    collaborator: string;
  }>,
) {
  const json = await adminFetch<{ data: AdminEvent }>(`/admin/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return json.data;
}

export async function listAdminArtists() {
  const json = await adminFetch<{ data: AdminArtist[] }>("/admin/artists");
  return json.data;
}

export async function listAdminMenuItems() {
  const json = await adminFetch<{ data: AdminMenuItem[] }>("/admin/menu/items");
  return json.data;
}

export async function createAdminMenuItem(payload: AdminMenuItemPayload) {
  const json = await adminFetch<{ data: AdminMenuItem }>("/admin/menu/items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return json.data;
}

export async function updateAdminMenuItem(
  id: string,
  payload: Partial<AdminMenuItemPayload>,
) {
  const json = await adminFetch<{ data: AdminMenuItem }>(
    `/admin/menu/items/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
  return json.data;
}

export async function deleteAdminMenuItem(id: string) {
  const json = await adminFetch<{ data: { success: boolean } }>(
    `/admin/menu/items/${id}`,
    { method: "DELETE" },
  );
  return json.data;
}

export async function replaceEventLineup(
  eventId: string,
  items: Array<{ artistId: string; roleLabel: string; sortOrder: number }>,
) {
  const json = await adminFetch<{ data: unknown }>(
    `/admin/events/${eventId}/lineup`,
    {
      method: "PUT",
      body: JSON.stringify({ items }),
    },
  );
  return json.data;
}
