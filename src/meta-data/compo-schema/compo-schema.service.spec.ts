import { Test, TestingModule } from '@nestjs/testing';
import { CompoSchemaService } from './compo-schema.service';

describe('CompoSchemaService', () => {
  let service: CompoSchemaService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompoSchemaService],
    }).compile();
    service = module.get<CompoSchemaService>(CompoSchemaService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
