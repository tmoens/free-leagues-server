import { Module } from '@nestjs/common';
import { ScoreSchemaController } from './score-schema.controller';
import { ScoreSchemaService } from './score-schema.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreSchema } from './score-schema.entity';
import { ScoreSchemaRepository } from './score-schema.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScoreSchema, ScoreSchemaRepository]),
  ],
  controllers: [
    ScoreSchemaController,
  ],
  providers: [
    ScoreSchemaService,
  ],
  exports: [
    ScoreSchemaService,
  ],
})
export class ScoreSchemaModule {}
