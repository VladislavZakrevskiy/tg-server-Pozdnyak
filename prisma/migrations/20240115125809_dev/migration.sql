/*
  Warnings:

  - A unique constraint covering the columns `[srcAsset]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `srcAsset` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "srcAsset" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_srcAsset_key" ON "Card"("srcAsset");
