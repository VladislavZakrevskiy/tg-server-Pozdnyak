import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/services';
import { CardsUpdate } from './cards.update';
import { CardService } from './cards.service';
import { CardController } from './card.controller';
import { PlayerService } from '@/player/player.service';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService, CardsUpdate, PlayerService],
})
export class CardModule {}
