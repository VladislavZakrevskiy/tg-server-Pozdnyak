import { PrismaService } from '@/common/services';
import { Injectable } from '@nestjs/common';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private readonly prisma: PrismaService) {}
  // ----------------------- Default CRUD Operations -----------------------

  async getPlayerById(
    player_id: string,
    withCards: { cards?: boolean; favCards?: boolean } = {},
  ) {
    const player = await this.prisma.player.findUnique({
      where: { player_id },
      include: {
        card_collection: withCards.cards,
        fav_card_collection: withCards.favCards,
      },
    });

    if (!player) return null;
    return player;
  }

  async deleteUser(player_id: string) {
    const player = await this.prisma.player.delete({ where: { player_id } });
    return player;
  }

  async updatePlayer(playerData: Partial<Player> & { player_id: string }) {
    const player = await this.prisma.player.findUnique({
      where: { player_id: playerData.player_id },
    });

    const changedPlayer = await this.prisma.player.update({
      data: {
        ...player,
        ...playerData,
      },
      where: { player_id: player.player_id },
    });

    return changedPlayer;
  }

  async registerPlayer(playerData: Player) {
    const candidate = await this.prisma.player.findUnique({
      where: { player_id: playerData.player_id },
    });
    if (candidate) return candidate;

    const player = await this.prisma.player.create({ data: playerData });
    return player;
  }
}
