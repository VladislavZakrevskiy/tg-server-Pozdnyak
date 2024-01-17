import { Action, Ctx, On, Wizard, WizardStep } from 'nestjs-telegraf';
import { ALL_CARDS_SCENE } from '../collection.scenes';
import { PlayerService } from '../../player/player.service';
import { WizardContext } from 'telegraf/typings/scenes';
import { Card, Player } from '@prisma/client';
import { TelegramMessages } from '@/common/helpers/TelegramMessages';
import { Markup } from 'telegraf';
import { CardService } from '@/cards/cards.service';

@Wizard(ALL_CARDS_SCENE)
export class AllCardsWizard {
  constructor(
    private readonly playerService: PlayerService,
    private readonly cardService: CardService,
  ) {}

  @WizardStep(1)
  async onEnter(
    @Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    const player = await this.playerService.getPlayerById(
      ctx.from.id.toString(),
      { cards: true },
    );
    ctx.wizard.state['player'] = player;
    ctx.wizard.cursor = 0;
    const cardNumbers = player.card_collection.length;
    const currentCard = player.card_collection[ctx.wizard.cursor];

    const btns = [
      [Markup.button.callback('+ ❤️ Добавить в Избранное', 'add_to_fav')],
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
    } & Player = ctx.wizard.state['player'];
    const cardNumbers = player.card_collection.length;
    const currentCard = player.card_collection[ctx.wizard.cursor];
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
      [Markup.button.callback('+ ❤️ Добавить в Избранное', 'add_to_fav')],
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

  @Action('add_to_fav')
  addToFav(
    @Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>,
  ) {
    const player: {
      card_collection: Card[];
    } & Player = ctx.wizard.state['player'];
    const currentCard = player.card_collection[ctx.wizard.cursor];

    this.cardService.addToFavCards(player.player_id, currentCard.card_id);
  }

  @On('text')
  onLeave(@Ctx() ctx: WizardContext<{ state: { player: Player }; cursor: 0 }>) {
    ctx.scene.leave();
  }
}
