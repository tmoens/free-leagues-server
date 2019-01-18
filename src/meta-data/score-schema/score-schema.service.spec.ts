import { Test, TestingModule } from '@nestjs/testing';
import { ScoreSchemaService } from './score-schema.service';

describe('ScoreSchemaService', () => {
  let service: ScoreSchemaService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreSchemaService],
    }).compile();
    service = module.get<ScoreSchemaService>(ScoreSchemaService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
