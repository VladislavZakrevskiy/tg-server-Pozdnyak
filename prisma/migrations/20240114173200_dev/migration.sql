/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "phone_number",
ALTER COLUMN "username" DROP NOT NULL;
