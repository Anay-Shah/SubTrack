-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Other',
    "cost" REAL NOT NULL,
    "billingFrequency" TEXT NOT NULL,
    "renewalDate" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Subscription" ("billingFrequency", "category", "cost", "createdAt", "id", "name", "notes", "renewalDate", "updatedAt") SELECT "billingFrequency", "category", "cost", "createdAt", "id", "name", "notes", "renewalDate", "updatedAt" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");
CREATE INDEX "Subscription_renewalDate_idx" ON "Subscription"("renewalDate");
CREATE INDEX "Subscription_category_idx" ON "Subscription"("category");
CREATE INDEX "Subscription_billingFrequency_idx" ON "Subscription"("billingFrequency");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
