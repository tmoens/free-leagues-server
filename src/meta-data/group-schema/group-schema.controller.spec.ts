import { GroupSchemaController } from './group-schema.controller';
import { GroupSchemaService } from './group-schema.service';
import { GroupSchema } from './group-schema.entity';
import { GroupSchemaRepository, GSDTO } from './group-schema.repository';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('GroupSchemaController', () => {
  let controller: GroupSchemaController;
  let service: GroupSchemaService;
  let repo: GroupSchemaRepository;
  let id: string;

  // @ts-ignore
  beforeEach( async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([GroupSchema, GroupSchemaRepository]),
      ],
      controllers: [GroupSchemaController],
      providers: [GroupSchemaService ],
    }).compile();
    service = module.get<GroupSchemaService>(GroupSchemaService);
    controller = module.get<GroupSchemaController>(GroupSchemaController);
    repo = module.get<GroupSchemaRepository>(GroupSchemaRepository);

    const vestigialGSs: GroupSchema[] = await controller.findByName({partialName: '_test_'});
    const removeResult = await repo.remove(vestigialGSs);
  });

  describe('Add a group schema', () => {
    it('Save it then find it.', async () => {
      const testGS_1: GSDTO = new GSDTO();
      testGS_1.parentId = null;
      testGS_1.genericGroupName = '_test_1_';
      testGS_1.genericGroupNameShort = '_test_1_short_';
      testGS_1.description = 'desc';
      let t: GroupSchema = await controller.create(testGS_1);
      let x: GroupSchema[] = await controller.findByName({partialName: testGS_1.genericGroupName});
      expect(x[0].genericGroupNameShort).toBe(testGS_1.genericGroupNameShort);
      id = x[0].id;
      const testGS_1_1: GSDTO = new GSDTO();
      testGS_1_1.parentId = id;
      testGS_1_1.genericGroupName = '_test_1_1';
      testGS_1_1.genericGroupNameShort = '_test_1_1_short_';
      testGS_1_1.description = 'desc11';
      t = await controller.create(testGS_1_1);
      x = await controller.findByName({partialName: testGS_1_1.genericGroupName});
      expect(x[0].genericGroupNameShort).toBe(testGS_1_1.genericGroupNameShort);
      console.log (JSON.stringify(x[0]));
    });
  });
});