"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { CATEGORIES, BILLING_OPTIONS } from "@/lib/constants"
import { SubscriptionSchema } from "@/lib/validations"
import type { SubscriptionSchemaType } from "@/lib/validations"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SubscriptionFormProps {
  defaultValues?: Partial<SubscriptionSchemaType>
  onSubmit: (data: SubscriptionSchemaType) => Promise<void>
  onCancel?: () => void
  submitLabel?: string
}

type FormState = {
  name: string
  category: string
  cost: string
  billingFrequency: string
  renewalDate: string
  notes: string
}

type FormErrors = Partial<Record<keyof SubscriptionSchemaType | "root", string>>

function toDateInputValue(iso: string | undefined | null): string {
  if (!iso) return ""
  return iso.split("T")[0]
}

export function SubscriptionForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: SubscriptionFormProps) {
  const [form, setForm] = useState<FormState>({
    name: defaultValues?.name ?? "",
    category: defaultValues?.category ?? "",
    cost: defaultValues?.cost != null ? String(defaultValues.cost) : "",
    billingFrequency: defaultValues?.billingFrequency ?? "monthly",
    renewalDate: toDateInputValue(defaultValues?.renewalDate),
    notes: defaultValues?.notes ?? "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key as keyof SubscriptionSchemaType]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const costNum = form.cost.trim() === "" ? NaN : parseFloat(form.cost)

    const parsed = SubscriptionSchema.safeParse({
      name: form.name.trim(),
      category: form.category,
      cost: costNum,
      billingFrequency: form.billingFrequency,
      renewalDate: form.renewalDate,
      notes: form.notes.trim() || undefined,
    })

    if (!parsed.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof SubscriptionSchemaType
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(parsed.data)
    } catch (err) {
      setErrors({ root: (err as Error).message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Name</label>
        <Input
          placeholder="e.g. Netflix"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Category</label>
        <Select value={form.category} onValueChange={(val) => val && setField("category", val)}>
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
      </div>

      {/* Cost + Billing */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Cost ($)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="9.99"
            value={form.cost}
            onChange={(e) => setField("cost", e.target.value)}
            aria-invalid={!!errors.cost}
          />
          {errors.cost && <p className="text-xs text-destructive">{errors.cost}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Billing</label>
          <Select value={form.billingFrequency} onValueChange={(val) => val && setField("billingFrequency", val)}>
            <SelectTrigger className="w-full h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BILLING_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Renewal date */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Next Renewal Date</label>
        <Input
          type="date"
          value={form.renewalDate}
          onChange={(e) => setField("renewalDate", e.target.value)}
          aria-invalid={!!errors.renewalDate}
        />
        {errors.renewalDate && <p className="text-xs text-destructive">{errors.renewalDate}</p>}
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">
          Notes{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Textarea
          placeholder="Any additional notes..."
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
          rows={3}
        />
        {errors.notes && <p className="text-xs text-destructive">{errors.notes}</p>}
      </div>

      {errors.root && (
        <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">
          {errors.root}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-1">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
