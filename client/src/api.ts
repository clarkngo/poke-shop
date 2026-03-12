import type { IngredientsMap, SignatureBowl, BowlBuild, OrderResponse, User } from "./types";

const BASE = "/api";

async function request<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getIngredients: () => request<IngredientsMap>("/ingredients"),
  getSignatureBowls: () => request<SignatureBowl[]>("/ingredients/signature-bowls"),
  placeOrder: (items: BowlBuild[], userId?: string) =>
    request<OrderResponse>("/orders", {
      method: "POST",
      body: JSON.stringify({ items, userId }),
    }),
  getOrder: (id: string) => request<OrderResponse & { items: BowlBuild[] }>(`/orders/${id}`),
  register: (username: string, email: string, password: string) =>
    request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }),
  login: (email: string, password: string) =>
    request<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
