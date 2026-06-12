export type Category =
  | "Entertainment"
  | "Productivity"
  | "AI"
  | "Education"
  | "Fitness"
  | "Utilities"
  | "Other"

export type BillingFrequency = "monthly" | "yearly"

export interface Subscription {
  id: string
  name: string
  category: Category
  cost: number
  billingFrequency: BillingFrequency
  renewalDate: string // ISO date string (serialized from Date)
  notes?: string | null
  isActive: boolean
  createdAt: string   // ISO date string
  updatedAt: string   // ISO date string
}

export interface SubscriptionInput {
  name: string
  category: Category
  cost: number
  billingFrequency: BillingFrequency
  renewalDate: string // ISO date string
  notes?: string
}

export interface DashboardStats {
  monthlySpend: number
  yearlySpend: number
  activeCount: number
  pausedCount: number
  nextRenewal: Subscription | null
  spendByCategory: { category: Category; amount: number }[]
}
