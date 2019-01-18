import { Module } from '@nestjs/common';
import { ScoreSchemaController } from './score-schema.controller';
import { ScoreSchemaService } from './score-schema.service';

@Module({
  controllers: [ScoreSchemaController],
  providers: [ScoreSchemaService],
})
export class ScoreSchemaModule {}
