"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setConfirmed(true)
    }
  }

  if (confirmed) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4 text-center">
        <div className="flex justify-center">
          <CheckCircle className="size-10 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Check your email</h2>
          <p className="text-sm text-muted-foreground mt-1">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
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
        <h2 className="text-lg font-semibold">Create account</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Start tracking your subscriptions</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-3">
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
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
          <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
        </div>
        {error && (
          <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
        )}
        <Button type="submit" className="w-full gap-2" disabled={isLoading}>
          {isLoading && <Loader2 className="size-3.5 animate-spin" />}
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-foreground hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
