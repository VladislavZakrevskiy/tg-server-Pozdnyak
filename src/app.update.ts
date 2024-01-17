import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { PlayerService } from './player/player.service';
import { TelegramMessages } from './common/helpers/TelegramMessages';
import { CardAction, CollectionAction, StudioActions } from './app.consts';

@Update()
export class AppUpdate {
  constructor(private readonly playerService: PlayerService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const { first_name, id, last_name, username } = ctx.message.from;
    const player = await this.playerService.registerPlayer({
      first_name,
      last_name,
      player_id: id.toString(),
      score_season: 0,
      score_all_time: 0,
      username,
      free_tryings: 0,
      last_trying: new Date(0),
    });
    const btns = Markup.keyboard([
      [
        Markup.button.callback('🃏 Карта', CardAction),
        Markup.button.callback('💎 Коллекция', CollectionAction),
      ],
      [Markup.button.callback('⛪️ Лютеранская церковь', StudioActions)],
    ]).resize(true);

    await ctx.replyWithHTML(TelegramMessages.getStartMessage(player), btns);
  }
}
