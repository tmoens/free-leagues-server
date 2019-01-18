import { Test, TestingModule } from '@nestjs/testing';
import { CompoPlayerService } from './compo-player.service';

describe('CompoPlayerService', () => {
  let service: CompoPlayerService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompoPlayerService],
    }).compile();
    service = module.get<CompoPlayerService>(CompoPlayerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
