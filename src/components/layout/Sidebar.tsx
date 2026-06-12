"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, CreditCard, Calendar, Plus, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/uiStore"
import { useUser } from "@/hooks/useUser"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/calendar", label: "Calendar", icon: Calendar },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const openAddModal = useUIStore((s) => s.openAddModal)
  const { user } = useUser()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/sign-in")
  }

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border bg-sidebar h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <span className="text-lg font-semibold tracking-tight text-foreground">SubTrack</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: Add button + user/sign-out */}
      <div className="px-3 pb-4 space-y-3">
        <Button onClick={openAddModal} className="w-full gap-2" size="sm">
          <Plus className="size-4" />
          Add Subscription
        </Button>

        {user && (
          <div className="flex items-center gap-2 px-1">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleSignOut}
              aria-label="Sign out"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-3.5" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
