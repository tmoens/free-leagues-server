import { Module } from '@nestjs/common';
import { CompoPlayerController } from './compo-player.controller';
import { CompoPlayerService } from './compo-player.service';

@Module({
  controllers: [CompoPlayerController],
  providers: [CompoPlayerService]
})
export class CompoPlayerModule {}
