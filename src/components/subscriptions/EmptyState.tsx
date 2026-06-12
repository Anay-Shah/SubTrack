"use client"

import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/uiStore"

interface EmptyStateProps {
  filtered?: boolean
}

export function EmptyState({ filtered = false }: EmptyStateProps) {
  const { openAddModal, resetFilters } = useUIStore()

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
      <div className="p-5 rounded-2xl bg-muted">
        <CreditCard className="size-10 text-muted-foreground" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold">
          {filtered ? "No matching subscriptions" : "No subscriptions yet"}
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          {filtered
            ? "Try adjusting your search or filters."
            : "Start tracking your recurring payments by adding your first subscription."}
        </p>
      </div>
      {filtered ? (
        <Button variant="outline" onClick={resetFilters}>Clear Filters</Button>
      ) : (
        <Button onClick={openAddModal}>Add Subscription</Button>
      )}
    </div>
  )
}
