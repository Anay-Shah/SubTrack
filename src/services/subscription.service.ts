import { prisma } from "@/lib/prisma"
import type { SubscriptionSchemaType } from "@/lib/validations"

export async function toggleSubscriptionActive(id: string, userId: string, isActive: boolean) {
  return prisma.subscription.update({
    where: { id, userId },
    data: { isActive },
  })
}

export async function getAllSubscriptions(userId: string) {
  return prisma.subscription.findMany({
    where: { userId },
    orderBy: { renewalDate: "asc" },
  })
}

export async function getSubscriptionById(id: string, userId: string) {
  return prisma.subscription.findUnique({ where: { id, userId } })
}

export async function createSubscription(userId: string, data: SubscriptionSchemaType) {
  return prisma.subscription.create({
    data: {
      userId,
      name: data.name,
      category: data.category,
      cost: data.cost,
      billingFrequency: data.billingFrequency,
      renewalDate: new Date(data.renewalDate),
      notes: data.notes ?? null,
    },
  })
}

export async function updateSubscription(id: string, userId: string, data: Partial<SubscriptionSchemaType>) {
  return prisma.subscription.update({
    where: { id, userId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.cost !== undefined && { cost: data.cost }),
      ...(data.billingFrequency !== undefined && { billingFrequency: data.billingFrequency }),
      ...(data.renewalDate !== undefined && { renewalDate: new Date(data.renewalDate) }),
      ...(data.notes !== undefined && { notes: data.notes ?? null }),
    },
  })
}

export async function deleteSubscription(id: string, userId: string) {
  return prisma.subscription.delete({ where: { id, userId } })
}
