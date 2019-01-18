import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';

describe('Team Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TeamController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TeamController = module.get<TeamController>(TeamController);
    expect(controller).toBeDefined();
  });
});
