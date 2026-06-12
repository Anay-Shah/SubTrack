"use client"

import { getDaysInMonth, getDay, startOfMonth } from "date-fns"
import { CalendarDayCell } from "./CalendarDayCell"
import type { Subscription } from "@/types"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface CalendarGridProps {
  year: number
  month: number // 0-indexed
  events: Map<string, Subscription[]>
  selectedDay: number | null
  onSelectDay: (day: number | null) => void
}

export function CalendarGrid({ year, month, events, selectedDay, onSelectDay }: CalendarGridProps) {
  const today = new Date()
  const firstDayOfWeek = getDay(startOfMonth(new Date(year, month, 1)))
  const daysInMonth = getDaysInMonth(new Date(year, month, 1))

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOfWeek }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  // Pad to complete the last row
  const remainder = cells.length % 7
  if (remainder !== 0) {
    cells.push(...Array.from({ length: 7 - remainder }, () => null))
  }

  function getDayKey(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  function isToday(day: number) {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-center text-xs font-medium text-muted-foreground py-1">
            {wd}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          const key = day ? getDayKey(day) : null
          return (
            <CalendarDayCell
              key={i}
              day={day}
              subscriptions={key ? (events.get(key) ?? []) : []}
              isToday={day !== null && isToday(day)}
              isSelected={day !== null && day === selectedDay}
              onClick={
                day !== null
                  ? () => onSelectDay(day === selectedDay ? null : day)
                  : undefined
              }
            />
          )
        })}
      </div>
    </div>
  )
}
