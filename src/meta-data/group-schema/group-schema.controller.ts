import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import {GroupSchemaService} from './group-schema.service';
import {GroupSchema} from './group-schema.entity';
import { GSDTO, GroupSchemaRepository, PartialNameQueryParams } from './group-schema.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('GroupSchema')
export class GroupSchemaController {
  constructor(
    @InjectRepository(GroupSchemaRepository)
    private readonly repo: GroupSchemaRepository,
    private readonly service: GroupSchemaService,
  ) {
  }

  @Get()
  // @UseGuards(AuthGuard('bearer'))
  async findAll(): Promise<GroupSchema[]> {
    return await this.repo.find();
  }

  @Get('findByName')
  // @UseGuards(AuthGuard('bearer'))
  async findByName(@Query() query: PartialNameQueryParams): Promise<GroupSchema[]> {
    return await this.repo.findByName(query.partialName);
  }


  @Get('/findTrees')
  // temporary thing to have a look at what is in the database and learn the TreeRepository API
  async findTrees(): Promise<any> {
    const resp: any = {};
    resp.findTrees =  await this.repo.findTrees();
    resp.findRoots = await this.repo.findRoots();
    return resp;
  }

  @Post()
  async create(@Body() gs: GSDTO): Promise<GroupSchema> {
    return await this.repo.createAndSave(gs);
  }
}
