import { Module } from '@nestjs/common';
import { CompoService } from './compo.service';

@Module({
  providers: [CompoService]
})
export class CompoModule {}
