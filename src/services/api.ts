import type { Subscription, SubscriptionInput } from "@/types"

const BASE = "/api/subscriptions"

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }))
    throw new Error(err.error ?? "Request failed")
  }
  return res.json()
}

export async function fetchSubscriptions(): Promise<Subscription[]> {
  const res = await fetch(BASE)
  return handleResponse<Subscription[]>(res)
}

export async function fetchSubscriptionById(id: string): Promise<Subscription> {
  const res = await fetch(`${BASE}/${id}`)
  return handleResponse<Subscription>(res)
}

export async function apiCreateSubscription(data: SubscriptionInput): Promise<Subscription> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return handleResponse<Subscription>(res)
}

export async function apiUpdateSubscription(id: string, data: Partial<SubscriptionInput>): Promise<Subscription> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return handleResponse<Subscription>(res)
}

export async function apiDeleteSubscription(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" })
  await handleResponse<{ success: boolean }>(res)
}

export async function apiToggleActive(id: string, isActive: boolean): Promise<Subscription> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  })
  return handleResponse<Subscription>(res)
}
