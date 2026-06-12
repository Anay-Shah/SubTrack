import { z } from "zod"

const CATEGORIES = ["Entertainment", "Productivity", "AI", "Education", "Fitness", "Utilities", "Other"] as const
const BILLING = ["monthly", "yearly"] as const

export const SubscriptionSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  category: z.enum(CATEGORIES),
  cost: z.number().positive("Cost must be greater than 0"),
  billingFrequency: z.enum(BILLING),
  renewalDate: z.string().min(1, "Renewal date is required"),
  notes: z.string().max(500).optional().nullable(),
})

export const CreateSubscriptionSchema = SubscriptionSchema

export const UpdateSubscriptionSchema = SubscriptionSchema.partial()

export type SubscriptionSchemaType = z.infer<typeof SubscriptionSchema>
