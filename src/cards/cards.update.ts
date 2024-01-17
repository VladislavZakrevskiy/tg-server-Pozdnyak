import { CardAction } from '@/app.consts';
import { RandomCard } from '@/common/helpers/RandomCard';
import { TelegramMessages } from '@/common/helpers/TelegramMessages';
import { Update, Ctx, Action, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { CardService } from './cards.service';
import { PlayerService } from '../player/player.service';

@Update()
export class CardsUpdate {
  constructor(
    private readonly cardService: CardService,
    private readonly playerService: PlayerService,
  ) {}

  @Hears('🃏 Карта')
  async onCardCbQuery(@Ctx() ctx: Context) {
    console.log('ok');
    const randomCard = new RandomCard();
    const card = await this.cardService.getCardBySrcAsset(randomCard.srcAsset);
    const player = await this.playerService.getPlayerById(
      ctx.from.id.toString(),
    );
    await this.cardService.giveCard(player.player_id.toString(), card.card_id);
    console.log('ok');
    ctx.replyWithPhoto(
      { source: card.srcAsset },
      {
        parse_mode: 'HTML',
        caption: TelegramMessages.getCardInformation(
          card,
          player.score_all_time,
          player.score_season,
        ),
      },
    );
  }
}
