"use client"

import Link from "next/link"
import { formatShortDate, formatRenewalCountdown } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/constants"
import type { Subscription } from "@/types"

interface UpcomingRenewalsProps {
  subscriptions: Subscription[]
}

export function UpcomingRenewals({ subscriptions }: UpcomingRenewalsProps) {
  const upcoming = [...subscriptions]
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
    .slice(0, 5)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 h-full">
      <p className="text-sm font-medium mb-4">Upcoming Renewals</p>

      {upcoming.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm">
          No upcoming renewals
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming.map((sub) => {
            const colors = CATEGORY_COLORS[sub.category as keyof typeof CATEGORY_COLORS] ?? CATEGORY_COLORS.Other
            const countdown = formatRenewalCountdown(sub.renewalDate)
            const isUrgent = countdown.includes("day") && parseInt(countdown) <= 3

            return (
              <Link
                key={sub.id}
                href={`/subscriptions/${sub.id}`}
                className="flex items-center gap-3 group rounded-xl px-2 py-1.5 -mx-2 hover:bg-accent transition-colors"
              >
                {/* Icon placeholder with category color */}
                <div className={`size-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${colors.bg} ${colors.text}`}>
                  {sub.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-foreground">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">{formatShortDate(sub.renewalDate)}</p>
                </div>

                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                  isUrgent
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {countdown}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
