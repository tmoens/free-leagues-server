import { Test, TestingModule } from '@nestjs/testing';
import { CompoSchemaController } from './compo-schema.controller';

describe('CompoSchema Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CompoSchemaController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CompoSchemaController = module.get<CompoSchemaController>(CompoSchemaController);
    expect(controller).toBeDefined();
  });
});
