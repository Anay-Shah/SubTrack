"use client"

import { useMemo } from "react"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import { toMonthlyAmount } from "@/lib/utils"
import type { Category, DashboardStats } from "@/types"
import { CATEGORIES } from "@/lib/constants"

export function useDashboardStats(): DashboardStats {
  const subscriptions = useSubscriptionStore((s) => s.subscriptions)

  return useMemo(() => {
    const active = subscriptions.filter((s) => s.isActive)
    const paused = subscriptions.filter((s) => !s.isActive)

    const monthlySpend = active.reduce(
      (sum, s) => sum + toMonthlyAmount(s.cost, s.billingFrequency),
      0
    )
    const yearlySpend = monthlySpend * 12

    const sorted = [...active].sort(
      (a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime()
    )
    const nextRenewal = sorted[0] ?? null

    const spendByCategory = CATEGORIES.map((category) => {
      const amount = active
        .filter((s) => s.category === category)
        .reduce((sum, s) => sum + toMonthlyAmount(s.cost, s.billingFrequency), 0)
      return { category: category as Category, amount }
    }).filter((c) => c.amount > 0)

    return {
      monthlySpend,
      yearlySpend,
      activeCount: active.length,
      pausedCount: paused.length,
      nextRenewal,
      spendByCategory,
    }
  }, [subscriptions])
}
