"use client"

import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProps {
  label: string
  value: string
  subtext?: string
  icon: LucideIcon
  iconColor?: string
  loading?: boolean
}

export function StatCard({ label, value, subtext, icon: Icon, iconColor = "text-primary", loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-1 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className={cn("p-2 rounded-xl bg-muted", iconColor)}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="text-3xl font-bold tabular-nums tracking-tight">{value}</p>
      {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
    </div>
  )
}
