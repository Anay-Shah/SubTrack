import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "SubTrack — Subscription Manager",
  description: "Track all your subscriptions, understand your spending, and avoid unexpected renewals.",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
