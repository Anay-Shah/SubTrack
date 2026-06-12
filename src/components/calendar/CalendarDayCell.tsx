import { cn } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/constants"
import type { Subscription } from "@/types"

interface CalendarDayCellProps {
  day: number | null
  subscriptions: Subscription[]
  isToday: boolean
  isSelected: boolean
  onClick?: () => void
}

export function CalendarDayCell({
  day,
  subscriptions,
  isToday,
  isSelected,
  onClick,
}: CalendarDayCellProps) {
  if (day === null) {
    return <div className="aspect-square" />
  }

  const dots = subscriptions.slice(0, 3)
  const overflow = subscriptions.length - 3

  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square flex flex-col items-center justify-start pt-1.5 rounded-xl text-sm transition-colors",
        "hover:bg-muted/60 cursor-pointer",
        isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
        isToday && !isSelected && "font-bold ring-1 ring-primary/40 bg-primary/5",
      )}
    >
      <span className="text-sm leading-none">{day}</span>
      {subscriptions.length > 0 && (
        <div className="flex items-center gap-0.5 mt-1.5">
          {dots.map((sub, i) => (
            <span
              key={i}
              className="size-1.5 rounded-full"
              style={{
                backgroundColor: isSelected ? "white" : CATEGORY_COLORS[sub.category].dot,
              }}
            />
          ))}
          {overflow > 0 && (
            <span
              className={cn(
                "text-[9px] leading-none ml-0.5",
                isSelected ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              +{overflow}
            </span>
          )}
        </div>
      )}
    </button>
  )
}
