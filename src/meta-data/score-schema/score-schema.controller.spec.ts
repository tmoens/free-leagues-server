import { Test, TestingModule } from '@nestjs/testing';
import { ScoreSchemaController } from './score-schema.controller';

describe('ScoreSchema Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ScoreSchemaController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ScoreSchemaController = module.get<ScoreSchemaController>(ScoreSchemaController);
    expect(controller).toBeDefined();
  });
});
