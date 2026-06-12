"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

interface CalendarHeaderProps {
  year: number
  month: number // 0-indexed
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

export function CalendarHeader({ year, month, onPrev, onNext, onToday }: CalendarHeaderProps) {
  const label = format(new Date(year, month, 1), "MMMM yyyy")
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onPrev} aria-label="Previous month">
        <ChevronLeft className="size-4" />
      </Button>
      <span className="text-base font-semibold w-36 text-center">{label}</span>
      <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next month">
        <ChevronRight className="size-4" />
      </Button>
      {!isCurrentMonth && (
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
      )}
    </div>
  )
}
