"use client"

import Link from "next/link"
import { format } from "date-fns"
import { CalendarDays, ArrowRight } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/constants"
import type { Subscription } from "@/types"

interface CalendarEventListProps {
  year: number
  month: number // 0-indexed
  selectedDay: number | null
  events: Map<string, Subscription[]>
}

function SubscriptionRow({ sub }: { sub: Subscription }) {
  const colors = CATEGORY_COLORS[sub.category]
  return (
    <Link
      href={`/subscriptions/${sub.id}`}
      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors group"
    >
      <span
        className="size-2 rounded-full shrink-0"
        style={{ backgroundColor: colors.dot }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{sub.name}</p>
        <p className={cn("text-xs", colors.text)}>{sub.category}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold tabular-nums">{formatCurrency(sub.cost)}</p>
        <p className="text-xs text-muted-foreground">
          {sub.billingFrequency === "monthly" ? "/mo" : "/yr"}
        </p>
      </div>
      <ArrowRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </Link>
  )
}

export function CalendarEventList({ year, month, selectedDay, events }: CalendarEventListProps) {
  // Build display data depending on whether a day is selected
  let title: string
  let groups: { dateLabel: string; subs: Subscription[] }[]

  if (selectedDay !== null) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    const subs = events.get(key) ?? []
    title = format(new Date(year, month, selectedDay), "MMMM d, yyyy")
    groups = subs.length > 0 ? [{ dateLabel: "", subs }] : []
  } else {
    title = `Renewals — ${format(new Date(year, month, 1), "MMMM yyyy")}`
    groups = Array.from(events.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, subs]) => ({
        dateLabel: format(new Date(date + "T12:00:00"), "EEE, MMM d"),
        subs,
      }))
  }

  const allSubs = groups.flatMap((g) => g.subs)
  const totalCost = allSubs.reduce((sum, s) => sum + s.cost, 0)

  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <CalendarDays className="size-4 text-muted-foreground shrink-0" />
        <h3 className="font-semibold text-sm truncate">{title}</h3>
      </div>

      {/* List */}
      <div className="flex-1 min-h-0">
        {allSubs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            {selectedDay !== null ? "No renewals on this day." : "No renewals this month."}
          </p>
        ) : (
          <div className="space-y-4">
            {groups.map((group, i) => (
              <div key={i}>
                {group.dateLabel && (
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 px-1">
                    {group.dateLabel}
                  </p>
                )}
                <div className="space-y-0.5">
                  {group.subs.map((sub) => (
                    <SubscriptionRow key={sub.id} sub={sub} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer summary */}
      {allSubs.length > 0 && (
        <>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {allSubs.length} renewal{allSubs.length !== 1 ? "s" : ""}
            </span>
            <span className="font-semibold text-foreground tabular-nums">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
