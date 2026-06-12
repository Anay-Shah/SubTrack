"use client"

import { create } from "zustand"
import { toast } from "sonner"
import type { Subscription, SubscriptionInput } from "@/types"
import {
  fetchSubscriptions,
  apiCreateSubscription,
  apiUpdateSubscription,
  apiDeleteSubscription,
  apiToggleActive,
} from "@/services/api"

interface SubscriptionState {
  subscriptions: Subscription[]
  loading: boolean
  error: string | null

  // Actions
  loadSubscriptions: () => Promise<void>
  addSubscription: (data: SubscriptionInput) => Promise<Subscription>
  editSubscription: (id: string, data: Partial<SubscriptionInput>) => Promise<Subscription>
  removeSubscription: (id: string) => Promise<void>
  toggleActive: (id: string) => Promise<void>
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscriptions: [],
  loading: false,
  error: null,

  loadSubscriptions: async () => {
    set({ loading: true, error: null })
    try {
      const subscriptions = await fetchSubscriptions()
      set({ subscriptions, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  addSubscription: async (data) => {
    try {
      const subscription = await apiCreateSubscription(data)
      set((state) => ({ subscriptions: [...state.subscriptions, subscription] }))
      toast.success("Subscription added")
      return subscription
    } catch (err) {
      toast.error("Failed to add subscription")
      throw err
    }
  },

  editSubscription: async (id, data) => {
    try {
      const updated = await apiUpdateSubscription(id, data)
      set((state) => ({
        subscriptions: state.subscriptions.map((s) => (s.id === id ? updated : s)),
      }))
      toast.success("Changes saved")
      return updated
    } catch (err) {
      toast.error("Failed to save changes")
      throw err
    }
  },

  removeSubscription: async (id) => {
    const previous = get().subscriptions
    set((state) => ({ subscriptions: state.subscriptions.filter((s) => s.id !== id) }))
    try {
      await apiDeleteSubscription(id)
      toast.success("Subscription deleted")
    } catch (err) {
      set({ subscriptions: previous })
      toast.error("Failed to delete subscription")
      throw err
    }
  },

  toggleActive: async (id) => {
    const previous = get().subscriptions
    const sub = previous.find((s) => s.id === id)
    if (!sub) return
    // Optimistic update
    set((state) => ({
      subscriptions: state.subscriptions.map((s) =>
        s.id === id ? { ...s, isActive: !s.isActive } : s
      ),
    }))
    try {
      const updated = await apiToggleActive(id, !sub.isActive)
      set((state) => ({
        subscriptions: state.subscriptions.map((s) => (s.id === id ? updated : s)),
      }))
      toast.success(updated.isActive ? "Subscription resumed" : "Subscription paused")
    } catch (err) {
      set({ subscriptions: previous })
      toast.error("Failed to update subscription")
      throw err
    }
  },
}))
