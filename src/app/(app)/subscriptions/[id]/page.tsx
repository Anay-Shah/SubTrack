"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Pencil, Trash2, PauseCircle, PlayCircle } from "lucide-react"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import { fetchSubscriptionById } from "@/services/api"
import { SubscriptionForm } from "@/components/subscriptions/SubscriptionForm"
import { DeleteConfirmDialog } from "@/components/subscriptions/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn, formatCurrency, formatDate, formatRenewalCountdown } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/constants"
import type { Subscription } from "@/types"
import type { SubscriptionSchemaType } from "@/lib/validations"

export default function SubscriptionDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { editSubscription, removeSubscription, toggleActive } = useSubscriptionStore()

  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!params.id) return
    setLoading(true)
    fetchSubscriptionById(params.id)
      .then(setSubscription)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [params.id])

  async function handleUpdate(data: SubscriptionSchemaType) {
    if (!subscription) return
    const updated = await editSubscription(subscription.id, {
      name: data.name,
      category: data.category,
      cost: data.cost,
      billingFrequency: data.billingFrequency,
      renewalDate: data.renewalDate,
      notes: data.notes ?? undefined,
    })
    setSubscription(updated)
    setIsEditing(false)
  }

  async function handleDelete() {
    if (!subscription) return
    setIsDeleting(true)
    try {
      await removeSubscription(subscription.id)
      router.push("/subscriptions")
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleToggleActive() {
    if (!subscription) return
    await toggleActive(subscription.id)
    setSubscription((prev) => prev ? { ...prev, isActive: !prev.isActive } : prev)
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-2xl">
        <Skeleton className="h-8 w-48" />
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-56" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !subscription) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 -ml-2">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          {error ?? "Subscription not found."}
        </div>
      </div>
    )
  }

  const colors = CATEGORY_COLORS[subscription.category]
  const countdown = formatRenewalCountdown(subscription.renewalDate)
  const isOverdue = countdown === "Overdue"
  const isPaused = !subscription.isActive

  return (
    <div className="space-y-6 max-w-2xl">
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 -ml-2">
        <ArrowLeft className="size-4" />
        Back
      </Button>

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colors.bg, colors.text)}>
              {subscription.category}
            </span>
            {isPaused && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                Paused
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold tracking-tight truncate">{subscription.name}</h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleToggleActive} className="gap-2">
            {isPaused ? <PlayCircle className="size-3.5" /> : <PauseCircle className="size-3.5" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
            <Pencil className="size-3.5" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="gap-2 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/60 hover:bg-destructive/5"
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Edit Subscription</h3>
          <SubscriptionForm
            defaultValues={{
              name: subscription.name,
              category: subscription.category,
              cost: subscription.cost,
              billingFrequency: subscription.billingFrequency,
              renewalDate: subscription.renewalDate,
              notes: subscription.notes ?? undefined,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            submitLabel="Save Changes"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Cost</p>
              <p className="text-3xl font-bold tabular-nums leading-none">{formatCurrency(subscription.cost)}</p>
              <p className="text-xs text-muted-foreground capitalize">
                per {subscription.billingFrequency === "monthly" ? "month" : "year"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Next Renewal</p>
              <p className={cn("text-3xl font-bold leading-none", isOverdue ? "text-destructive" : "")}>
                {countdown}
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(subscription.renewalDate)}</p>
            </div>
          </div>

          {subscription.notes && (
            <>
              <div className="h-px bg-border" />
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Notes</p>
                <p className="text-sm leading-relaxed">{subscription.notes}</p>
              </div>
            </>
          )}

          <div className="h-px bg-border" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Added {formatDate(subscription.createdAt)}</span>
            <span>Updated {formatDate(subscription.updatedAt)}</span>
          </div>
        </div>
      )}

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        subscriptionName={subscription.name}
        isDeleting={isDeleting}
      />
    </div>
  )
}
