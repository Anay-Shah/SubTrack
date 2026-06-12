import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNowStrict, isPast, addMonths, addYears } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), "MMM d, yyyy")
}

export function formatShortDate(date: Date | string): string {
  return format(new Date(date), "MMM d")
}

/** Returns a human-friendly string like "in 3 days", "tomorrow", "today", or "overdue" */
export function formatRenewalCountdown(date: Date | string): string {
  const d = new Date(date)
  if (isPast(d)) return "Overdue"
  return formatDistanceToNowStrict(d, { addSuffix: true })
}

/** Compute the next renewal date given a start date and billing frequency */
export function nextRenewalDate(date: Date | string, frequency: "monthly" | "yearly"): Date {
  const d = new Date(date)
  const now = new Date()
  if (d > now) return d
  // Advance until it's in the future
  let next = frequency === "monthly" ? addMonths(d, 1) : addYears(d, 1)
  while (next <= now) {
    next = frequency === "monthly" ? addMonths(next, 1) : addYears(next, 1)
  }
  return next
}

/** Convert a yearly cost to monthly equivalent */
export function toMonthlyAmount(cost: number, frequency: "monthly" | "yearly"): number {
  return frequency === "yearly" ? cost / 12 : cost
}

