/*
  Warnings:

  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CardToPlayer" DROP CONSTRAINT "_CardToPlayer_B_fkey";

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
ALTER COLUMN "player_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("player_id");

-- AlterTable
ALTER TABLE "_CardToPlayer" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CardToPlayer" ADD CONSTRAINT "_CardToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;
