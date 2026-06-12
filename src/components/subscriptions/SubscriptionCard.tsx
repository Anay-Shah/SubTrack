"use client"

import { useRouter } from "next/navigation"
import { Calendar, Pencil, Trash2, PauseCircle, PlayCircle } from "lucide-react"
import { cn, formatCurrency, formatDate, formatRenewalCountdown } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import type { Subscription } from "@/types"

interface SubscriptionCardProps {
  subscription: Subscription
  onDelete: (subscription: Subscription) => void
  onToggleActive: (subscription: Subscription) => void
}

export function SubscriptionCard({ subscription, onDelete, onToggleActive }: SubscriptionCardProps) {
  const router = useRouter()
  const colors = CATEGORY_COLORS[subscription.category]
  const countdown = formatRenewalCountdown(subscription.renewalDate)
  const isOverdue = countdown === "Overdue"
  const isPaused = !subscription.isActive

  return (
    <div className={cn(
      "group rounded-2xl border border-border bg-card p-5 hover:shadow-md hover:border-ring/30 transition-all duration-200",
      isPaused && "opacity-60"
    )}>
      {/* Top row: category badge + billing frequency */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colors.bg, colors.text)}>
          {subscription.category}
        </span>
        <div className="flex items-center gap-1.5">
          {isPaused && (
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">Paused</span>
          )}
          <span className="text-xs text-muted-foreground capitalize">{subscription.billingFrequency}</span>
        </div>
      </div>

      {/* Service name */}
      <h3 className="font-semibold text-base mb-4 truncate">{subscription.name}</h3>

      {/* Cost + renewal countdown */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold tabular-nums leading-none">{formatCurrency(subscription.cost)}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            /{subscription.billingFrequency === "monthly" ? "mo" : "yr"}
          </p>
        </div>
        <div className="text-right">
          <div className={cn("flex items-center justify-end gap-1 text-xs font-medium", isOverdue ? "text-destructive" : "text-muted-foreground")}>
            <Calendar className="size-3" />
            <span>{countdown}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{formatDate(subscription.renewalDate)}</p>
        </div>
      </div>

      {/* Hover-reveal action row */}
      <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1"
          onClick={() => onToggleActive(subscription)}
          title={isPaused ? "Resume subscription" : "Pause subscription"}
        >
          {isPaused ? <PlayCircle className="size-3" /> : <PauseCircle className="size-3" />}
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1"
          onClick={() => router.push(`/subscriptions/${subscription.id}`)}
        >
          <Pencil className="size-3" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(subscription)}
        >
          <Trash2 className="size-3" />
          Delete
        </Button>
      </div>
    </div>
  )
}
