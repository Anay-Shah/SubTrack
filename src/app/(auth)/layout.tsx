import type { ReactNode } from "react"
import { CreditCard, TrendingDown, Bell, Calendar } from "lucide-react"

const FEATURES = [
  { icon: CreditCard, text: "Track all your subscriptions in one place" },
  { icon: TrendingDown, text: "Understand your monthly and yearly spend" },
  { icon: Bell, text: "Never miss a renewal again" },
  { icon: Calendar, text: "Visual calendar of upcoming charges" },
]

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <div>
          <span className="text-2xl font-bold tracking-tight text-primary-foreground">SubTrack</span>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-primary-foreground leading-tight">
              Know exactly what<br />you&apos;re paying for.
            </h2>
            <p className="text-primary-foreground/70 mt-3 text-lg">
              Stop subscription creep. Track, analyze, and manage all your subscriptions in one place.
            </p>
          </div>
          <ul className="space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-primary-foreground/80">
                <span className="p-2 rounded-xl bg-primary-foreground/10">
                  <Icon className="size-4 text-primary-foreground" />
                </span>
                <span className="text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/40">SubTrack — Free, private, yours.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          {/* Mobile-only logo */}
          <div className="text-center lg:hidden">
            <h1 className="text-2xl font-bold tracking-tight">SubTrack</h1>
            <p className="text-sm text-muted-foreground mt-1">Know what you&apos;re paying for.</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
