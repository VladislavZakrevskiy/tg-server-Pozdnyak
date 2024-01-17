-- CreateTable
CREATE TABLE "_fav_cards" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_fav_cards_AB_unique" ON "_fav_cards"("A", "B");

-- CreateIndex
CREATE INDEX "_fav_cards_B_index" ON "_fav_cards"("B");

-- AddForeignKey
ALTER TABLE "_fav_cards" ADD CONSTRAINT "_fav_cards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("card_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_fav_cards" ADD CONSTRAINT "_fav_cards_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;
