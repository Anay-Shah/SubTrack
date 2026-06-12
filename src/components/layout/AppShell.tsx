"use client"

import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { MobileNav } from "./MobileNav"
import { AddSubscriptionModal } from "@/components/subscriptions/AddSubscriptionModal"
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 px-4 md:px-6 py-6 pb-24 md:pb-8 animate-fade-in">
          {children}
        </main>
        <MobileNav />
      </div>
      <AddSubscriptionModal />
      <KeyboardShortcuts />
    </div>
  )
}
