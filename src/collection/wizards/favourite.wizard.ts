import { Action, Ctx, On, Wizard, WizardStep } from 'nestjs-telegraf';
import { FAV_SCENE } from '../collection.scenes';
import { PlayerService } from '../../player/player.service';
import { WizardContext } from 'telegraf/typings/scenes';
import { Card, Player } from '@prisma/client';
import { TelegramMessages } from '@/common/helpers/TelegramMessages';
import { Markup } from 'telegraf';

@Wizard(FAV_SCENE)
export class FavWizard {
  constructor(private readonly playerService: PlayerService) {}

  @WizardStep(1)
  async onEnter(
    @Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    const player = await this.playerService.getPlayerById(
      ctx.from.id.toString(),
      { favCards: true },
    );
    ctx.wizard.state['player'] = player;
    ctx.wizard.cursor = 0;
    const cardNumbers = player.fav_card_collection.length;
    const currentCard = player.fav_card_collection[ctx.wizard.cursor];

    const btns = [
      [
        ctx.wizard.cursor - 5 >= 0
          ? Markup.button.callback('<<<', '5_back')
          : undefined,
        ctx.wizard.cursor - 1 >= 0
          ? Markup.button.callback('<<', '1_back', ctx.wizard.cursor - 1 < 0)
          : undefined,
        Markup.button.callback(
          `${ctx.wizard.cursor + 1}/${cardNumbers}`,
          'nothing',
        ),
        ctx.wizard.cursor + 1 < cardNumbers
          ? Markup.button.callback('>>', '1_next')
          : undefined,
        ctx.wizard.cursor + 5 < cardNumbers
          ? Markup.button.callback('>>>', '5_next')
          : undefined,
      ].filter(Boolean),
      [Markup.button.callback('💎 Все карты', 'open_allcards_action')],
      [Markup.button.callback('⚒ Крафт', 'open_craft_action')],
      [Markup.button.callback('🍓 Дубликаты', 'open_double_action')],
    ];
    ctx.replyWithPhoto(
      {
        source: currentCard.srcAsset,
      },
      {
        caption: TelegramMessages.getCardInformation(
          currentCard,
          player.score_all_time,
          player.score_season,
          true,
        ),
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: btns },
      },
    );
  }

  async editMessage(
    ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    const player: {
      card_collection: Card[];
      fav_card_collection: Card[];
    } & Player = ctx.wizard.state['player'];
    const cardNumbers = player.fav_card_collection.length;
    const currentCard = player.fav_card_collection[ctx.wizard.cursor];
    console.log(ctx.wizard.cursor, cardNumbers);

    await ctx.editMessageMedia({
      caption: TelegramMessages.getCardInformation(
        currentCard,
        player.score_all_time,
        player.score_season,
        true,
      ),
      parse_mode: 'HTML',
      media: { source: currentCard.srcAsset },
      type: 'photo',
    });

    const btns = [
      [
        ctx.wizard.cursor - 5 >= 0
          ? Markup.button.callback('<<<', '5_back')
          : undefined,
        ctx.wizard.cursor - 1 >= 0
          ? Markup.button.callback('<<', '1_back', ctx.wizard.cursor - 1 < 0)
          : undefined,
        Markup.button.callback(
          `${ctx.wizard.cursor + 1}/${cardNumbers}`,
          'nothing',
        ),
        ctx.wizard.cursor + 1 < cardNumbers
          ? Markup.button.callback('>>', '1_next')
          : undefined,
        ctx.wizard.cursor + 5 < cardNumbers
          ? Markup.button.callback('>>>', '5_next')
          : undefined,
      ].filter(Boolean),
      [Markup.button.callback('💎 Все карты', 'open_allcards_action')],
      [Markup.button.callback('⚒ Крафт', 'open_craft_action')],
      [Markup.button.callback('🍓 Дубликаты', 'open_double_action')],
    ];
    await ctx.editMessageReplyMarkup({ inline_keyboard: btns });
  }

  @Action('5_back')
  async onBack5(
    @Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    ctx.wizard.cursor -= 5;
    await this.editMessage(ctx);
  }

  @Action('1_back')
  async onBack1(
    @Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    ctx.wizard.cursor -= 1;
    await this.editMessage(ctx);
  }

  @Action('1_next')
  async onNext1(
    @Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    ctx.wizard.cursor += 1;
    await this.editMessage(ctx);
  }

  @Action('5_next')
  async onNext5(
    @Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    ctx.wizard.cursor += 5;
    await this.editMessage(ctx);
  }

  @On('text')
  onLeave(@Ctx() ctx: WizardContext) {
    ctx.scene.leave();
  }
}
