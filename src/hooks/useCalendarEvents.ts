"use client"

import { useMemo } from "react"
import { addMonths, addYears, format } from "date-fns"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import type { Subscription } from "@/types"

/**
 * Advances the subscription's base renewal date by billing period until it
 * lands in the target month, or returns null if it never does.
 */
function getRenewalForMonth(sub: Subscription, year: number, month: number): Date | null {
  const monthStart = new Date(year, month, 1)
  const monthEnd = new Date(year, month + 1, 0)

  let d = new Date(sub.renewalDate)
  // Advance forward until we reach or pass the target month start
  while (d < monthStart) {
    d = sub.billingFrequency === "monthly" ? addMonths(d, 1) : addYears(d, 1)
  }
  return d <= monthEnd ? d : null
}

/** Returns a Map of "YYYY-MM-DD" → Subscription[] for the given month */
export function useCalendarEvents(year: number, month: number): Map<string, Subscription[]> {
  const subscriptions = useSubscriptionStore((s) => s.subscriptions)

  return useMemo(() => {
    const map = new Map<string, Subscription[]>()
    for (const sub of subscriptions) {
      const renewal = getRenewalForMonth(sub, year, month)
      if (renewal) {
        const key = format(renewal, "yyyy-MM-dd")
        const existing = map.get(key) ?? []
        map.set(key, [...existing, sub])
      }
    }
    return map
  }, [subscriptions, year, month])
}
