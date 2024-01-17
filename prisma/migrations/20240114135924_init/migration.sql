-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('OMEZHKA', 'BASIC', 'RARE', 'ELEPHANT', 'ELEPHANT_SHARK', 'ALPHA');

-- CreateTable
CREATE TABLE "Player" (
    "player_id" UUID NOT NULL,
    "phone_number" TEXT,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "score_all_time" INTEGER NOT NULL,
    "score_season" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "Card" (
    "card_id" UUID NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "_CardToPlayer" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_player_id_key" ON "Player"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_card_id_key" ON "Card"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToPlayer_AB_unique" ON "_CardToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToPlayer_B_index" ON "_CardToPlayer"("B");

-- AddForeignKey
ALTER TABLE "_CardToPlayer" ADD CONSTRAINT "_CardToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("card_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToPlayer" ADD CONSTRAINT "_CardToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;
