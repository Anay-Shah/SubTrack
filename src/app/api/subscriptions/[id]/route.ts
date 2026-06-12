import { NextResponse } from "next/server"
import { UpdateSubscriptionSchema } from "@/lib/validations"
import {
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  toggleSubscriptionActive,
} from "@/services/subscription.service"
import { createClient } from "@/lib/supabase/server"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    const subscription = await getSubscriptionById(id, user.id)
    if (!subscription) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json(subscription)
  } catch {
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    const parsed = UpdateSubscriptionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const subscription = await updateSubscription(id, user.id, parsed.data)
    return NextResponse.json(subscription)
  } catch {
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    if (typeof body.isActive !== "boolean") {
      return NextResponse.json({ error: "isActive must be a boolean" }, { status: 400 })
    }
    const subscription = await toggleSubscriptionActive(id, user.id, body.isActive)
    return NextResponse.json(subscription)
  } catch {
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    await deleteSubscription(id, user.id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete subscription" }, { status: 500 })
  }
}
