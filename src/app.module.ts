import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './common/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './common/configs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { CardModule } from './cards/cards.module';
import { AppUpdate } from './app.update';
import { PlayerModule } from './player/player.module';
import { PlayerService } from './player/player.service';
import { CollectionModule } from './collection/collection.module';
import { session } from 'telegraf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_ID,
      middlewares: [session()],
    }),
    CardModule,
    PlayerModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    PrismaService,
    AppUpdate,
    PlayerService,
  ],
})
export class AppModule {}
