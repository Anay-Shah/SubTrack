"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { useUIStore } from "@/store/uiStore"
import { useDebounce } from "@/hooks/useDebounce"
import { CATEGORIES } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SubscriptionFilters() {
  const { searchQuery, filters, setSearchQuery, setFilter, resetFilters } = useUIStore()
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const debouncedSearch = useDebounce(localSearch, 300)

  useEffect(() => {
    setSearchQuery(debouncedSearch)
  }, [debouncedSearch, setSearchQuery])

  // Sync local state when store is reset externally
  useEffect(() => {
    if (searchQuery === "" && localSearch !== "") {
      setLocalSearch("")
    }
  }, [searchQuery]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasActiveFilters =
    localSearch !== "" ||
    filters.category !== "all" ||
    filters.billingFrequency !== "all" ||
    filters.activeStatus !== "active" ||
    filters.sortBy !== "renewalDate" ||
    filters.sortOrder !== "asc"

  function handleReset() {
    setLocalSearch("")
    resetFilters()
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search subscriptions..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Category */}
      <Select
        value={filters.category}
        onValueChange={(val) => setFilter("category", val as typeof filters.category)}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Billing */}
      <Select
        value={filters.billingFrequency}
        onValueChange={(val) => setFilter("billingFrequency", val as typeof filters.billingFrequency)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Billing" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All billing</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>

      {/* Active status */}
      <Select
        value={filters.activeStatus}
        onValueChange={(val) => setFilter("activeStatus", val as typeof filters.activeStatus)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="all">All status</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={`${filters.sortBy}:${filters.sortOrder}`}
        onValueChange={(val) => {
          if (!val) return
          const [sortBy, sortOrder] = val.split(":") as [typeof filters.sortBy, typeof filters.sortOrder]
          setFilter("sortBy", sortBy)
          setFilter("sortOrder", sortOrder)
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="renewalDate:asc">Renewal (soonest)</SelectItem>
          <SelectItem value="renewalDate:desc">Renewal (latest)</SelectItem>
          <SelectItem value="cost:desc">Cost (high first)</SelectItem>
          <SelectItem value="cost:asc">Cost (low first)</SelectItem>
          <SelectItem value="name:asc">Name (A–Z)</SelectItem>
          <SelectItem value="name:desc">Name (Z–A)</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5">
          <X className="size-3.5" />
          Clear
        </Button>
      )}
    </div>
  )
}
