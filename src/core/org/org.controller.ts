import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgRepository } from './org.repository';
import { Org } from './org.entity';
import { MoveInTree, UUID } from '../utils/apiClasses';
import { OrgDTO } from './org.dto';

@Controller('org')
export class OrgController {
  constructor(
    @InjectRepository(OrgRepository)
    private readonly repo: OrgRepository,
  ) {}

  // For organizations the default GET request finds all the organization
  // trees rather than all the organizations
  @Get()
  async findTrees(): Promise<Org[]> {
    return await this.repo.findTrees();
  }

  // This is a non-hierarchical list of organizations.
  @Get('/all')
  async findAll(): Promise<Org[]> {
    return await this.repo.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('bearer'))
  async findById(@Param() params): Promise<Org> {
    return await this.repo.findOne(params.uuid);
  }

  // TODO perhaps the "freeleagues" organization should be the only root
  // organization. This might allow for sharing freeLeagues templates to
  // all organizations and it might allow freeLeagues administrators to
  // have rights in all organizations. But this would only work in a
  // model where sharing goes toward the root and admin privileges go
  // toward the leaves.
  // There is merit in this idea somewhere.
  @Post()
  async create(@Body() dto: OrgDTO): Promise<Org> {
    return await this.repo.createAndSave(dto);
  }

  @Put()
  async update(@Body() dto: OrgDTO): Promise<Org> {
    return await this.repo.validateAndUpdate(dto);
  }

  @Delete()
  async remove(@Body() dto: OrgDTO): Promise<any> {
    return this.repo.validateAndRemove(dto);
  }

  // @Post('move')
  // async move(@Query() query: MoveInTree): Promise<Org> {
  //   return await this.repo.validateAndMove(query.uuid, query.toParentUuid);
  // }
}
