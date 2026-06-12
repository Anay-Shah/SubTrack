"use client"

import { useState } from "react"
import { Target, Pencil, Check, X } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { useUIStore } from "@/store/uiStore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface BudgetCardProps {
  monthlySpend: number
}

export function BudgetCard({ monthlySpend }: BudgetCardProps) {
  const { monthlyBudget, setMonthlyBudget } = useUIStore()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState("")

  function handleEditStart() {
    setInputValue(monthlyBudget != null ? String(monthlyBudget) : "")
    setIsEditing(true)
  }

  function handleSave() {
    const val = parseFloat(inputValue)
    if (!isNaN(val) && val > 0) {
      setMonthlyBudget(val)
    } else if (inputValue.trim() === "") {
      setMonthlyBudget(null)
    }
    setIsEditing(false)
  }

  function handleCancel() {
    setIsEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") handleCancel()
  }

  const percentage = monthlyBudget ? Math.min((monthlySpend / monthlyBudget) * 100, 100) : 0
  const isOverBudget = monthlyBudget != null && monthlySpend > monthlyBudget

  if (monthlyBudget == null && !isEditing) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-6 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-muted text-muted-foreground">
            <Target className="size-4" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly Budget</p>
            <p className="text-sm text-muted-foreground mt-0.5">Not set</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleEditStart} className="gap-1.5 text-xs">
          <Pencil className="size-3" />
          Set budget
        </Button>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly Budget</p>
          <span className={cn("p-2 rounded-xl bg-muted", "text-violet-600")}>
            <Target className="size-4" />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 100"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-6"
              autoFocus
            />
          </div>
          <Button size="icon-sm" onClick={handleSave}><Check className="size-3.5" /></Button>
          <Button size="icon-sm" variant="ghost" onClick={handleCancel}><X className="size-3.5" /></Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Leave empty to remove budget</p>
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-2xl border bg-card p-6 space-y-1 hover:shadow-md transition-shadow duration-200",
      isOverBudget ? "border-destructive/40" : "border-border"
    )}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly Budget</p>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={handleEditStart} className="text-muted-foreground hover:text-foreground">
            <Pencil className="size-3" />
          </Button>
          <span className={cn("p-2 rounded-xl bg-muted", isOverBudget ? "text-destructive" : "text-violet-600")}>
            <Target className="size-4" />
          </span>
        </div>
      </div>
      <p className={cn("text-3xl font-bold tabular-nums tracking-tight", isOverBudget && "text-destructive")}>
        {formatCurrency(monthlySpend)}
        <span className="text-lg font-medium text-muted-foreground ml-1">/ {formatCurrency(monthlyBudget!)}</span>
      </p>
      <div className="space-y-1 pt-1">
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isOverBudget ? "bg-destructive" : percentage > 80 ? "bg-amber-500" : "bg-emerald-500"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className={cn("text-xs", isOverBudget ? "text-destructive" : "text-muted-foreground")}>
          {isOverBudget
            ? `${formatCurrency(monthlySpend - monthlyBudget!)} over budget`
            : `${formatCurrency(monthlyBudget! - monthlySpend)} remaining`}
        </p>
      </div>
    </div>
  )
}
