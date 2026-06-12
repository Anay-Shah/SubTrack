import { Skeleton } from "@/components/ui/skeleton"

export function SubscriptionSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-40" />
      <div className="flex items-end justify-between mt-2">
        <div className="space-y-1">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

export function SubscriptionSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SubscriptionSkeleton key={i} />
      ))}
    </div>
  )
}
