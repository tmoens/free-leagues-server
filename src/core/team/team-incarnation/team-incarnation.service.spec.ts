import { Test, TestingModule } from '@nestjs/testing';
import { TeamIncarnationService } from './team-incarnation.service';

describe('TeamIncarnationService', () => {
  let service: TeamIncarnationService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamIncarnationService],
    }).compile();
    service = module.get<TeamIncarnationService>(TeamIncarnationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
