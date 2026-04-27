/*
  Warnings:

  - You are about to drop the column `rating` on the `Cafe` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cafe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT,
    "crossStreet" TEXT,
    "openHours" TEXT,
    "distance" REAL,
    "wifiSpeed" TEXT,
    "powerOutlets" TEXT,
    "noiseLevel" TEXT
);
INSERT INTO "new_Cafe" ("address", "crossStreet", "description", "distance", "id", "name", "noiseLevel", "openHours", "powerOutlets", "slug", "wifiSpeed") SELECT "address", "crossStreet", "description", "distance", "id", "name", "noiseLevel", "openHours", "powerOutlets", "slug", "wifiSpeed" FROM "Cafe";
DROP TABLE "Cafe";
ALTER TABLE "new_Cafe" RENAME TO "Cafe";
CREATE UNIQUE INDEX "Cafe_slug_key" ON "Cafe"("slug");
CREATE INDEX "Cafe_slug_idx" ON "Cafe"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
