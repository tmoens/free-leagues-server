import { Test, TestingModule } from '@nestjs/testing';
import { CompoPlayerController } from './compo-player.controller';

describe('CompoPlayer Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CompoPlayerController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CompoPlayerController = module.get<CompoPlayerController>(CompoPlayerController);
    expect(controller).toBeDefined();
  });
});
