import { BadRequestException, Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {GroupService} from './group.service';
import {Group} from './group.entity';
import { GroupRepository } from './group.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupDTO } from './group.dto';

@Controller('Group')
export class GroupController {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly repo: GroupRepository,
    private readonly service: GroupService,
  ) {
  }

  // Get all the tournaments and leagues
  @Get()
  async findTrees(): Promise<any> {
    return await this.repo.findTrees();
  }

  @Get('/all')
  // @UseGuards(AuthGuard('bearer'))
  async findAll(): Promise<Group[]> {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() gs: GroupDTO): Promise<any> {
    return await this.repo.createGroup(gs);
  }

  @Put()
  async update(@Body() dto: GroupDTO): Promise<any> {
    return await this.repo.updateGroup(dto);
  }
  //
  // @Delete()
  // async remove(@Body() dto: OrgDTO): Promise<any> {
  //   return this.repo.validateAndRemove(dto);
  // }

}
