import { Test, TestingModule } from '@nestjs/testing';
import { CompoService } from './compo.service';

describe('CompoService', () => {
  let service: CompoService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompoService],
    }).compile();
    service = module.get<CompoService>(CompoService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
