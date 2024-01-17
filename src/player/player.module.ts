import { Module } from '@nestjs/common';
import { PrismaService } from '@/common/services';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerUpdate } from './player.update';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, PrismaService, PlayerUpdate],
})
export class PlayerModule {}
