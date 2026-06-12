"use client"

import { useEffect } from "react"
import { DollarSign, TrendingUp, CreditCard, Bell } from "lucide-react"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import { useDashboardStats } from "@/hooks/useDashboardStats"
import { formatCurrency, formatShortDate } from "@/lib/utils"
import { StatCard } from "./StatCard"
import { BudgetCard } from "./BudgetCard"
import { SpendingChart } from "./SpendingChart"
import { UpcomingRenewals } from "./UpcomingRenewals"
import { DashboardSkeleton } from "./DashboardSkeleton"

export function DashboardContent() {
  const { loading, error, loadSubscriptions, subscriptions } = useSubscriptionStore()
  const stats = useDashboardStats()

  useEffect(() => {
    loadSubscriptions()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <DashboardSkeleton />

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Failed to load subscriptions: {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Monthly Spending"
          value={formatCurrency(stats.monthlySpend)}
          subtext={`${stats.activeCount} active subscription${stats.activeCount !== 1 ? "s" : ""}${stats.pausedCount > 0 ? ` · ${stats.pausedCount} paused` : ""}`}
          icon={DollarSign}
          iconColor="text-emerald-600"
        />
        <StatCard
          label="Yearly Spending"
          value={formatCurrency(stats.yearlySpend)}
          subtext="Projected annual total"
          icon={TrendingUp}
          iconColor="text-blue-600"
        />
        <StatCard
          label="Active Subscriptions"
          value={String(stats.activeCount)}
          subtext={stats.activeCount === 0 ? "Add your first subscription" : "Tracked services"}
          icon={CreditCard}
          iconColor="text-violet-600"
        />
        <StatCard
          label="Next Renewal"
          value={stats.nextRenewal ? formatShortDate(stats.nextRenewal.renewalDate) : "—"}
          subtext={stats.nextRenewal ? stats.nextRenewal.name : "No upcoming renewals"}
          icon={Bell}
          iconColor="text-orange-600"
        />
      </div>

      {/* Budget card */}
      <BudgetCard monthlySpend={stats.monthlySpend} />

      {/* Chart + Upcoming renewals */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <SpendingChart data={stats.spendByCategory} />
        </div>
        <div className="lg:col-span-2">
          <UpcomingRenewals subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  )
}
