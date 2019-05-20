import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vocabulary } from './vocabulary.entity';
import { VocabularyController } from './vocabulary.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vocabulary]),
],
  providers: [
    ],
  controllers: [
    VocabularyController,
    ],
  exports: [
    VocabularyModule,
    ],
})

export class VocabularyModule {}
