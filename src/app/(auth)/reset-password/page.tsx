"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailCheck } from "lucide-react"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    })
    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4 text-center">
        <div className="flex justify-center">
          <MailCheck className="size-10 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Check your email</h2>
          <p className="text-sm text-muted-foreground mt-1">
            We sent a password reset link to <strong>{email}</strong>.
          </p>
        </div>
        <Link href="/sign-in" className="text-sm font-medium text-foreground hover:underline">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Reset password</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Enter your email and we&apos;ll send a reset link.
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/sign-in" className="font-medium text-foreground hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
