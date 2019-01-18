import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgRepository } from './org.repository';
import { OrgService } from './org.service';
import { Org } from './org.entity';
import { MoveInTree, UUID } from '../utils/apiClasses';
import { OrgDTO } from './org.dto';

@Controller('org')
export class OrgController {
  constructor(
    @InjectRepository(OrgRepository)
    private readonly repo: OrgRepository,
    private readonly service: OrgService,
  ) {}

  @Get()
  // @UseGuards(AuthGuard('bearer'))
  async findAll(@Query() query: UUID): Promise<Org> {
    return await this.repo.findOne(query.uuid);
  }

  @Get('/findTrees')
  // temporary thing to have a look at what is in the database and learn the TreeRepository API
  async findTrees(): Promise<any> {
    return await this.repo.findTrees();
  }

  @Post()
  async create(@Body() dto: OrgDTO, @Query() query: UUID): Promise<Org> {
    return await this.repo.createAndSave(dto, query.uuid);
  }

  @Put()
  async update(@Body() dto: OrgDTO): Promise<Org> {
    return await this.repo.validateAndUpdate(dto);
  }

  @Delete()
  async remove(@Body() dto: OrgDTO): Promise<any> {
    return this.repo.validateAndRemove(dto);
  }

  @Post('move')
  async move(@Query() query: MoveInTree): Promise<Org> {
    return await this.repo.validateAndMove(query.uuid, query.toParentUuid);
  }
}
