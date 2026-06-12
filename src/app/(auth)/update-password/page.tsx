"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    setIsLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      await supabase.auth.signOut()
      router.push("/sign-in")
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Set new password</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Choose a strong password for your account.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">New password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Confirm password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update password"}
        </Button>
      </form>
    </div>
  )
}
