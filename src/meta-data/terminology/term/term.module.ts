import { Module } from '@nestjs/common';
import { TermController } from './term.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from './term.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Term]),
  ],
  providers: [
  ],
  controllers: [
    TermController,
  ],
  exports: [
    TermModule,
  ],
})
export class TermModule {}
