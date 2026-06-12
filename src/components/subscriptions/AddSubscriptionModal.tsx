"use client"

import { useUIStore } from "@/store/uiStore"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SubscriptionForm } from "./SubscriptionForm"
import type { SubscriptionSchemaType } from "@/lib/validations"

export function AddSubscriptionModal() {
  const { isAddModalOpen, closeAddModal } = useUIStore()
  const addSubscription = useSubscriptionStore((s) => s.addSubscription)

  async function handleSubmit(data: SubscriptionSchemaType) {
    await addSubscription({
      name: data.name,
      category: data.category,
      cost: data.cost,
      billingFrequency: data.billingFrequency,
      renewalDate: data.renewalDate,
      notes: data.notes ?? undefined,
    })
    closeAddModal()
  }

  return (
    <Dialog open={isAddModalOpen} onOpenChange={(open) => { if (!open) closeAddModal() }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>Track a new recurring payment.</DialogDescription>
        </DialogHeader>
        <SubscriptionForm
          onSubmit={handleSubmit}
          onCancel={closeAddModal}
          submitLabel="Add Subscription"
        />
      </DialogContent>
    </Dialog>
  )
}
