-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Other',
    "cost" REAL NOT NULL,
    "billingFrequency" TEXT NOT NULL,
    "renewalDate" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Subscription_renewalDate_idx" ON "Subscription"("renewalDate");

-- CreateIndex
CREATE INDEX "Subscription_category_idx" ON "Subscription"("category");

-- CreateIndex
CREATE INDEX "Subscription_billingFrequency_idx" ON "Subscription"("billingFrequency");
