import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from './score.controller';

describe('Score Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ScoreController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ScoreController = module.get<ScoreController>(ScoreController);
    expect(controller).toBeDefined();
  });
});
