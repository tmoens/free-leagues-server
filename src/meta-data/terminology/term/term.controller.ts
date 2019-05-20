import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Term } from './term.entity';
import { classToPlain } from 'class-transformer';

@Controller('Term')
export class TermController {

  constructor(
    @InjectRepository(Term)
    private readonly repo: Repository<Term>,
  ) {}

  @Get()
  async findAll(): Promise<any> {
    const items: Term[] = await this.repo.find();
    return classToPlain(items);
  }

}
