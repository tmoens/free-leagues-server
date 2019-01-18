import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';

describe('Person Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PersonController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PersonController = module.get<PersonController>(PersonController);
    expect(controller).toBeDefined();
  });
});
