import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {GroupSchema} from './group-schema.entity';
import { GroupSchemaRepository } from './group-schema.repository';
import {GroupSchemaService} from './group-schema.service';
import { GroupSchemaDTO, PartialNameQueryParams } from './group-schema.dto';

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
  async findTrees(): Promise<any> {
    return await this.repo.findTrees();
  }

  @Post()
  async create(@Body() gs: GroupSchemaDTO): Promise<GroupSchema> {
    return await this.repo.createAndSave(gs);
  }
}
