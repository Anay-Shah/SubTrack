import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"

const prisma = new PrismaClient()

// Placeholder userId for local development seeding.
// In production, subscriptions are always created with a real Supabase user ID.
const DEV_USER_ID = "dev-user"

async function main() {
  // Clear existing data
  await prisma.subscription.deleteMany()

  const today = new Date()
  const addDays = (d: Date, days: number) => new Date(d.getTime() + days * 86400000)

  await prisma.subscription.createMany({
    data: [
      {
        userId: DEV_USER_ID,
        name: "Netflix",
        category: "Entertainment",
        cost: 22.99,
        billingFrequency: "monthly",
        renewalDate: addDays(today, 8),
        notes: "4K Premium plan",
      },
      {
        userId: DEV_USER_ID,
        name: "Spotify",
        category: "Entertainment",
        cost: 11.99,
        billingFrequency: "monthly",
        renewalDate: addDays(today, 12),
        notes: "Individual plan",
      },
      {
        userId: DEV_USER_ID,
        name: "Claude Pro",
        category: "AI",
        cost: 20.0,
        billingFrequency: "monthly",
        renewalDate: addDays(today, 15),
      },
      {
        userId: DEV_USER_ID,
        name: "ChatGPT Plus",
        category: "AI",
        cost: 20.0,
        billingFrequency: "monthly",
        renewalDate: addDays(today, 22),
      },
      {
        userId: DEV_USER_ID,
        name: "Adobe Creative Cloud",
        category: "Productivity",
        cost: 599.88,
        billingFrequency: "yearly",
        renewalDate: addDays(today, 45),
        notes: "All Apps plan",
      },
      {
        userId: DEV_USER_ID,
        name: "YouTube Premium",
        category: "Entertainment",
        cost: 13.99,
        billingFrequency: "monthly",
        renewalDate: addDays(today, 5),
      },
      {
        userId: DEV_USER_ID,
        name: "Canva Pro",
        category: "Productivity",
        cost: 169.99,
        billingFrequency: "yearly",
        renewalDate: addDays(today, 60),
      },
      {
        userId: DEV_USER_ID,
        name: "Amazon Prime",
        category: "Utilities",
        cost: 139.0,
        billingFrequency: "yearly",
        renewalDate: addDays(today, 90),
        notes: "Includes Prime Video and free shipping",
      },
    ],
  })

  console.log("✅ Seeded 8 subscriptions (userId: dev-user)")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
