"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { CATEGORY_COLORS, CHART_COLORS } from "@/lib/constants"
import { formatCurrency } from "@/lib/utils"
import type { Category } from "@/types"

interface SpendingChartProps {
  data: { category: Category; amount: number }[]
}

interface TooltipPayload {
  name: string
  value: number
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-lg text-sm">
      <p className="font-medium">{name}</p>
      <p className="text-muted-foreground">{formatCurrency(value)}<span className="text-xs">/mo</span></p>
    </div>
  )
}

export function SpendingChart({ data }: SpendingChartProps) {
  const total = data.reduce((sum, d) => sum + d.amount, 0)

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-medium mb-4">Spending by Category</p>
        <div className="flex items-center justify-center h-48">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="size-24 rounded-full border-4 border-dashed border-border" />
            <p className="text-sm">No data yet</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-sm font-medium mb-1">Spending by Category</p>
      <p className="text-xs text-muted-foreground mb-4">Monthly equivalent</p>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Donut chart */}
        <div className="relative shrink-0">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={90}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.category} fill={CHART_COLORS[entry.category]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-lg font-bold tabular-nums">{formatCurrency(total)}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {data.map((entry) => {
            const pct = total > 0 ? ((entry.amount / total) * 100).toFixed(0) : "0"
            const colors = CATEGORY_COLORS[entry.category]
            return (
              <div key={entry.category} className="flex items-center gap-2.5">
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: CHART_COLORS[entry.category] }}
                />
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${colors.bg} ${colors.text}`}>
                  {entry.category}
                </span>
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  {formatCurrency(entry.amount)}/mo
                </span>
                <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
