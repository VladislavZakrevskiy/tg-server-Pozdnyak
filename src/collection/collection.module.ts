import { Module } from '@nestjs/common';
import { PlayerService } from '@/player/player.service';
import { CardService } from '@/cards/cards.service';
import { CollectionUpdate } from './collection.update';
import { FavWizard } from './wizards/favourite.wizard';
import { PrismaService } from '@/common/services';
import { AllCardsWizard } from './wizards/all_cards.wizard';

@Module({
  controllers: [],
  providers: [
    CardService,
    PlayerService,
    CollectionUpdate,
    FavWizard,
    PrismaService,
    AllCardsWizard,
  ],
})
export class CollectionModule {}
