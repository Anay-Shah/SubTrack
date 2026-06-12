"use client"

import { useEffect } from "react"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import { useUIStore } from "@/store/uiStore"
import type { Subscription } from "@/types"

/** Returns filtered + sorted subscriptions based on current UI store state */
function filterAndSort(
  subscriptions: Subscription[],
  searchQuery: string,
  filters: ReturnType<typeof useUIStore.getState>["filters"]
): Subscription[] {
  let result = [...subscriptions]

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    result = result.filter((s) => s.name.toLowerCase().includes(q))
  }

  if (filters.category !== "all") {
    result = result.filter((s) => s.category === filters.category)
  }

  if (filters.billingFrequency !== "all") {
    result = result.filter((s) => s.billingFrequency === filters.billingFrequency)
  }

  if (filters.activeStatus === "active") {
    result = result.filter((s) => s.isActive)
  } else if (filters.activeStatus === "paused") {
    result = result.filter((s) => !s.isActive)
  }

  result.sort((a, b) => {
    let cmp = 0
    if (filters.sortBy === "name") {
      cmp = a.name.localeCompare(b.name)
    } else if (filters.sortBy === "cost") {
      cmp = a.cost - b.cost
    } else {
      cmp = new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime()
    }
    return filters.sortOrder === "desc" ? -cmp : cmp
  })

  return result
}

export function useSubscriptions() {
  const { subscriptions, loading, error, loadSubscriptions, addSubscription, editSubscription, removeSubscription, toggleActive } =
    useSubscriptionStore()
  const { searchQuery, filters } = useUIStore()

  useEffect(() => {
    if (subscriptions.length === 0 && !loading) {
      loadSubscriptions()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = filterAndSort(subscriptions, searchQuery, filters)

  return {
    subscriptions: filtered,
    allSubscriptions: subscriptions,
    loading,
    error,
    addSubscription,
    editSubscription,
    removeSubscription,
    toggleActive,
    reload: loadSubscriptions,
  }
}
