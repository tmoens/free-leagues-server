import { Test, TestingModule } from '@nestjs/testing';
import { CompoController } from './compo.controller';

describe('Compo Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CompoController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CompoController = module.get<CompoController>(CompoController);
    expect(controller).toBeDefined();
  });
});
