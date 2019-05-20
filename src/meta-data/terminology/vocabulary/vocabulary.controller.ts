import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { Vocabulary } from './vocabulary.entity';

@Controller('vocabulary')
export class VocabularyController {  constructor(
  @InjectRepository(Vocabulary)
  private readonly repo: Repository<Vocabulary>,
) {}

  @Get(':name')
  async findAll(@Param() params): Promise<any> {
    const item: Vocabulary = await this.repo.findOne({where: {id: params.name}});
    return classToPlain(item);
  }
}
