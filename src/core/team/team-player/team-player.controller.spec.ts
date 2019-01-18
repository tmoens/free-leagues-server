import { Test, TestingModule } from '@nestjs/testing';
import { TeamPlayerController } from './team-player.controller';

describe('TeamPlayer Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TeamPlayerController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TeamPlayerController = module.get<TeamPlayerController>(TeamPlayerController);
    expect(controller).toBeDefined();
  });
});
