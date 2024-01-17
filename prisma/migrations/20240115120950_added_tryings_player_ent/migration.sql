/*
  Warnings:

  - Added the required column `last_trying` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "free_tryings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "last_trying" DATE NOT NULL,
ALTER COLUMN "score_all_time" SET DEFAULT 0,
ALTER COLUMN "score_season" SET DEFAULT 0;
