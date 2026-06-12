import { NextResponse } from "next/server"
import { CreateSubscriptionSchema } from "@/lib/validations"
import { getAllSubscriptions, createSubscription } from "@/services/subscription.service"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const subscriptions = await getAllSubscriptions(user.id)
    return NextResponse.json(subscriptions)
  } catch {
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await request.json()
    const parsed = CreateSubscriptionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const subscription = await createSubscription(user.id, parsed.data)
    return NextResponse.json(subscription, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}
