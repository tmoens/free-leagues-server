import { Test, TestingModule } from '@nestjs/testing';
import { OrgController } from './org.controller';

describe('Org Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrgController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OrgController = module.get<OrgController>(OrgController);
    expect(controller).toBeDefined();
  });
});
