"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/uiStore"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import { SubscriptionFilters } from "@/components/subscriptions/SubscriptionFilters"
import { SubscriptionGrid } from "@/components/subscriptions/SubscriptionGrid"

export default function SubscriptionsPage() {
  const openAddModal = useUIStore((s) => s.openAddModal)
  const count = useSubscriptionStore((s) => s.subscriptions.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subscriptions</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {count > 0
              ? `${count} active subscription${count !== 1 ? "s" : ""}`
              : "No subscriptions yet"}
          </p>
        </div>
        <Button onClick={openAddModal} className="gap-2 hidden md:inline-flex">
          <Plus className="size-4" />
          Add Subscription
        </Button>
      </div>

      {/* Filters */}
      <SubscriptionFilters />

      {/* Grid */}
      <SubscriptionGrid />
    </div>
  )
}
