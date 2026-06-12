"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUIStore } from "@/store/uiStore"

const SHORTCUTS = [
  { keys: ["⌘", "N"], label: "Add new subscription" },
  { keys: ["?"], label: "Show keyboard shortcuts" },
  { keys: ["Esc"], label: "Close modal / cancel" },
]

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)
  const openAddModal = useUIStore((s) => s.openAddModal)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      // Don't fire shortcuts when typing in inputs
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return

      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault()
        openAddModal()
        return
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [openAddModal])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 pt-2">
          {SHORTCUTS.map((s) => (
            <div key={s.label} className="flex items-center justify-between py-1.5">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 rounded border border-border bg-muted text-xs font-mono font-medium"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
