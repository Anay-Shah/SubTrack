"use client"

import { useEffect, useState } from "react"
import { useSubscriptionStore } from "@/store/subscriptionStore"
import { useCalendarEvents } from "@/hooks/useCalendarEvents"
import { CalendarHeader } from "@/components/calendar/CalendarHeader"
import { CalendarGrid } from "@/components/calendar/CalendarGrid"
import { CalendarEventList } from "@/components/calendar/CalendarEventList"

export default function CalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth()) // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const { loadSubscriptions, subscriptions, loading } = useSubscriptionStore()

  useEffect(() => {
    if (subscriptions.length === 0 && !loading) {
      loadSubscriptions()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const events = useCalendarEvents(year, month)

  function handlePrev() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
    setSelectedDay(null)
  }

  function handleNext() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
    setSelectedDay(null)
  }

  function handleToday() {
    setYear(today.getFullYear())
    setMonth(today.getMonth())
    setSelectedDay(today.getDate())
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Upcoming renewal dates</p>
        </div>
        <CalendarHeader
          year={year}
          month={month}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 items-start">
        <CalendarGrid
          year={year}
          month={month}
          events={events}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
        <CalendarEventList
          year={year}
          month={month}
          selectedDay={selectedDay}
          events={events}
        />
      </div>
    </div>
  )
}
