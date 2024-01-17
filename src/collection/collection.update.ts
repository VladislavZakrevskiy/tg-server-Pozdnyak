import { Action, Command, Ctx, Hears, Update } from 'nestjs-telegraf';
import { Context, Markup, Scenes } from 'telegraf';
import {
  ALL_CARDS_SCENE,
  CRAFT_SCENE,
  DOUBLE_SCENE,
  FAV_SCENE,
} from './collection.scenes';
import { TelegramMessages } from '@/common/helpers/TelegramMessages';

@Update()
export class CollectionUpdate {
  @Hears('💎 Коллекция')
  openCollectionMenu(@Ctx() ctx: Context) {
    ctx.replyWithPhoto(
      { source: 'assets/bot/collection_photo.jpg' },
      {
        caption: '💎 Твои карты, братан!',
        reply_markup: {
          inline_keyboard: [
            [Markup.button.callback('❤️ Избранное', 'open_fav_action')],
            [Markup.button.callback('💎 Все карты', 'open_allcards_action')],
            [Markup.button.callback('⚒ Крафт', 'open_craft_action')],
            [Markup.button.callback('🍓 Дубликаты', 'open_double_action')],
            [Markup.button.callback('🖥 Удобный доступ', 'open_web_action')],
          ],
        },
      },
    );
  }

  @Action('open_fav_action')
  async onFavourite(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter(FAV_SCENE);
  }

  @Action('open_allcards_action')
  async onAllCards(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter(ALL_CARDS_SCENE);
  }

  @Action('open_craft_action')
  async onCraft(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter(CRAFT_SCENE);
  }

  @Action('open_double_action')
  async onDouble(@Ctx() ctx: Scenes.SceneContext) {
    await ctx.scene.enter(DOUBLE_SCENE);
  }

  @Action('open_web_action')
  async onOpenWeb(@Ctx() ctx: Scenes.SceneContext) {
    const btns = [[Markup.button.webApp('Веб-коллекция  🖥', 'https://hui.ru')]];
    await ctx.reply(TelegramMessages.getWebDescription(), {
      reply_markup: { inline_keyboard: btns },
    });
  }
}
