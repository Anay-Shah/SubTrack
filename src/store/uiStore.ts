"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Category, BillingFrequency } from "@/types"

interface Filters {
  category: Category | "all"
  billingFrequency: BillingFrequency | "all"
  sortBy: "name" | "cost" | "renewalDate"
  sortOrder: "asc" | "desc"
  activeStatus: "active" | "paused" | "all"
}

interface UIState {
  isAddModalOpen: boolean
  searchQuery: string
  filters: Filters
  monthlyBudget: number | null

  // Actions
  openAddModal: () => void
  closeAddModal: () => void
  setSearchQuery: (q: string) => void
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  resetFilters: () => void
  setMonthlyBudget: (budget: number | null) => void
}

const defaultFilters: Filters = {
  category: "all",
  billingFrequency: "all",
  sortBy: "renewalDate",
  sortOrder: "asc",
  activeStatus: "active",
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isAddModalOpen: false,
      searchQuery: "",
      filters: defaultFilters,
      monthlyBudget: null,

      openAddModal: () => set({ isAddModalOpen: true }),
      closeAddModal: () => set({ isAddModalOpen: false }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),
      resetFilters: () => set({ filters: defaultFilters, searchQuery: "" }),
      setMonthlyBudget: (monthlyBudget) => set({ monthlyBudget }),
    }),
    {
      name: "subtrack-ui",
      partialize: (state) => ({ monthlyBudget: state.monthlyBudget }),
    }
  )
)
