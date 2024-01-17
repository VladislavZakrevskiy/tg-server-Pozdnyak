/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `card_id` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_CardToPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_CardToPlayer" DROP CONSTRAINT "_CardToPlayer_A_fkey";

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "card_id",
ADD COLUMN     "card_id" SERIAL NOT NULL,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id");

-- AlterTable
ALTER TABLE "_CardToPlayer" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_card_id_key" ON "Card"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToPlayer_AB_unique" ON "_CardToPlayer"("A", "B");

-- AddForeignKey
ALTER TABLE "_CardToPlayer" ADD CONSTRAINT "_CardToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("card_id") ON DELETE CASCADE ON UPDATE CASCADE;
