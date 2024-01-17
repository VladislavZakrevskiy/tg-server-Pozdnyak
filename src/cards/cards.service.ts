import { PrismaService } from '@/common/services';
import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  // ----------------------- Default CRUD Operations -----------------------
  async addCard(card: Card) {
    const createdCard = await this.prisma.card.create({ data: card });
    return createdCard;
  }

  async deleteCardById(id: number) {
    const deletedCard = await this.prisma.card.delete({
      where: { card_id: id },
    });

    return deletedCard;
  }

  async getCardById(id: number) {
    const card = await this.prisma.card.findUnique({ where: { card_id: id } });
    if (card) return card;
    else return null;
  }

  async getCardBySrcAsset(srcAsset: string) {
    const card = await this.prisma.card.findUnique({ where: { srcAsset } });
    return card;
  }

  async updateCardById(
    cardData: Partial<Card> & { card_id: number },
    newOwners: string[] = [],
    deletedOwners: string[] = [],
  ) {
    const card = await this.prisma.card.findUnique({
      where: { card_id: cardData.card_id },
    });

    const changedCard = await this.prisma.card.update({
      where: { card_id: cardData.card_id },
      data: {
        ...card,
        ...cardData,
        owners: {
          connect: newOwners.map((id) => ({ player_id: id })),
          disconnect: deletedOwners.map((id) => ({ player_id: id })),
        },
      },
    });

    return changedCard;
  }

  // ----------------------- Connectivity of Player and Card Entities -----------------------
  async giveCard(player_id: string, card_id: number) {
    const card = await this.prisma.card.findUnique({ where: { card_id } });
    const player = await this.prisma.player.findUnique({
      where: { player_id },
    });
    // CHANGES OF PLAYER
    player.score_all_time += card.score;
    player.score_season += card.score;

    const changedPlayer = await this.prisma.player.update({
      where: { player_id: player.player_id },
      data: {
        ...player,
        card_collection: { connect: { card_id: card.card_id } },
      },
    });

    return changedPlayer;
  }

  async tookAwayCard(player_id: string, card_id: number) {
    const player = await this.prisma.player.findUnique({
      where: { player_id },
    });

    const changedPlayer = await this.prisma.player.update({
      where: { player_id: player.player_id },
      data: { ...player, card_collection: { disconnect: { card_id } } },
    });

    return changedPlayer;
  }

  async addToFavCards(player_id: string, card_id: number) {
    const player = await this.prisma.player.findUnique({
      where: { player_id },
    });

    const changedPlayer = this.prisma.player.update({
      where: { player_id: player.player_id },
      data: { ...player, fav_card_collection: { connect: { card_id } } },
    });

    return changedPlayer;
  }
}
