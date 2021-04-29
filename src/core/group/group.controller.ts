import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {GroupService} from './group.service';
import {Group} from './group.entity';
import { GroupRepository } from './group.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupDTO } from './group.dto';
import { classToPlain } from 'class-transformer';

@Controller('Group')
export class GroupController {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly repo: GroupRepository,
    private readonly service: GroupService,
  ) {
  }

  // Get a specific group with related objects
  @Get(':id')
  async findById(@Param() params): Promise<any> {
    return await classToPlain(await this.repo.findById(params.id));
  }

  // Get all the tournaments and leagues
  @Get()
  async getHierarchy(): Promise<any> {
    return await classToPlain(await this.repo.getHierarchy());
  }

  @Post()
  async create(@Body() gs: GroupDTO): Promise<any> {
    return await classToPlain(await this.repo.createGroup(gs));
  }

  @Put()
  async update(@Body() dto: GroupDTO): Promise<any> {
    return await classToPlain(await this.repo.updateGroup(dto));
  }
  //
  // @Delete()
  // async remove(@Body() dto: OrgDTO): Promise<any> {
  //   return this.repo.validateAndRemove(dto);
  // }


}
