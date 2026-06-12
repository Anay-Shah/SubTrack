"use client"

import { usePathname } from "next/navigation"
import { Moon, Sun, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/uiStore"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/subscriptions": "Subscriptions",
  "/calendar": "Calendar",
}

function getTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith("/subscriptions/")) return "Subscription Details"
  return "SubTrack"
}

export function TopBar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const openAddModal = useUIStore((s) => s.openAddModal)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-6 border-b border-border bg-background/80 backdrop-blur-sm">
      <h1 className="text-lg font-semibold tracking-tight">{getTitle(pathname)}</h1>

      <div className="flex items-center gap-2">
        {/* Mobile add button */}
        <Button onClick={openAddModal} size="sm" className="gap-1.5 md:hidden">
          <Plus className="size-4" />
          Add
        </Button>

        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="size-9"
        >
          <Sun className="size-4 dark:hidden" />
          <Moon className="size-4 hidden dark:block" />
        </Button>
      </div>
    </header>
  )
}
