"use client"

import { useState } from "react"
import { useSubscriptions } from "@/hooks/useSubscriptions"
import { useUIStore } from "@/store/uiStore"
import { SubscriptionCard } from "./SubscriptionCard"
import { SubscriptionSkeletonGrid } from "./SubscriptionSkeleton"
import { EmptyState } from "./EmptyState"
import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import type { Subscription } from "@/types"

export function SubscriptionGrid() {
  const { subscriptions, allSubscriptions, loading, error, removeSubscription, toggleActive } = useSubscriptions()
  const { searchQuery, filters } = useUIStore()
  const [toDelete, setToDelete] = useState<Subscription | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const isFiltered =
    searchQuery.trim() !== "" ||
    filters.category !== "all" ||
    filters.billingFrequency !== "all" ||
    filters.activeStatus !== "active"

  if (loading) return <SubscriptionSkeletonGrid />

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Failed to load subscriptions: {error}
      </div>
    )
  }

  if (subscriptions.length === 0) {
    return <EmptyState filtered={isFiltered && allSubscriptions.length > 0} />
  }

  async function handleDeleteConfirm() {
    if (!toDelete) return
    setIsDeleting(true)
    try {
      await removeSubscription(toDelete.id)
      setToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions.map((sub) => (
          <SubscriptionCard
            key={sub.id}
            subscription={sub}
            onDelete={setToDelete}
            onToggleActive={(s) => toggleActive(s.id)}
          />
        ))}
      </div>

      <DeleteConfirmDialog
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={handleDeleteConfirm}
        subscriptionName={toDelete?.name ?? ""}
        isDeleting={isDeleting}
      />
    </>
  )
}
