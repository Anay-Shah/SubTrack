import type { Category } from "@/types"

export const CATEGORIES: Category[] = [
  "Entertainment",
  "Productivity",
  "AI",
  "Education",
  "Fitness",
  "Utilities",
  "Other",
]

export const BILLING_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
] as const

/** Tailwind color classes for each category (text + background) */
export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; dot: string }> = {
  Entertainment: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-700 dark:text-violet-400", dot: "#7c3aed" },
  Productivity:  { bg: "bg-blue-100 dark:bg-blue-900/30",   text: "text-blue-700 dark:text-blue-400",   dot: "#2563eb" },
  AI:            { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", dot: "#059669" },
  Education:     { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400", dot: "#d97706" },
  Fitness:       { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", dot: "#ea580c" },
  Utilities:     { bg: "bg-slate-100 dark:bg-slate-800",    text: "text-slate-700 dark:text-slate-300",  dot: "#475569" },
  Other:         { bg: "bg-zinc-100 dark:bg-zinc-800",      text: "text-zinc-600 dark:text-zinc-400",   dot: "#71717a" },
}

/** Hex colors for Recharts donut chart segments (same order as CATEGORIES) */
export const CHART_COLORS: Record<Category, string> = {
  Entertainment: "#7c3aed",
  Productivity:  "#2563eb",
  AI:            "#059669",
  Education:     "#d97706",
  Fitness:       "#ea580c",
  Utilities:     "#475569",
  Other:         "#71717a",
}
