import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreSchemaRepository } from './score-schema.repository';

@Injectable()
export class ScoreSchemaService {
  constructor(
    @InjectRepository(ScoreSchemaRepository)
    private readonly repo: ScoreSchemaRepository,
  ) {}
}
