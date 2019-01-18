import { Test, TestingModule } from '@nestjs/testing';
import { TeamIncarnationController } from './team-incarnation.controller';

describe('TeamIncarnation Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TeamIncarnationController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TeamIncarnationController = module.get<TeamIncarnationController>(TeamIncarnationController);
    expect(controller).toBeDefined();
  });
});
