import { Body, Controller, Get, Post, } from '@nestjs/common';
import {GroupService} from './group.service';
import {Group} from './group.entity';
import { GroupSchemaDTO, GroupRepository } from './group.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('GroupSchema')
export class GroupController {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly repo: GroupRepository,
    private readonly service: GroupService,
  ) {
  }

  @Get()
  // @UseGuards(AuthGuard('bearer'))
  async findAll(): Promise<Group[]> {
    return await this.service.findAll();
  }

  @Get('findTrees')
  // temporary thing to have a look at what is in the database and learn the TreeRepository API
  async findTrees(): Promise<any> {
    const resp: any = {};
    resp.findTrees =  await this.repo.findTrees();
    resp.findRoots = await this.repo.findRoots();
    return resp;
  }

  @Post()
  async create(@Body() gs: GroupSchemaDTO): Promise<Group> {
    return await this.repo.createAndSave(gs);
  }

}
