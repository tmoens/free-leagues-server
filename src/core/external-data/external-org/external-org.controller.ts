import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalOrg } from './external-org.entity';
import { ExternalOrgDTO } from './external-org.dto';
import { ExternalOrgRepository } from './external-org.repository';
import { ExternalOrgService } from './external-org.service';

@Controller('ExternalOrg')
export class ExternalOrgController {
  constructor(
    @InjectRepository(ExternalOrgRepository)
    private readonly repo: ExternalOrgRepository,
    private readonly service: ExternalOrgService,
  ) {}

  @Get()
  // @UseGuards(AuthGuard('bearer'))
  async findAll(): Promise<ExternalOrg[]> {
    return await this.repo.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('bearer'))
  async findById(@Param() params): Promise<ExternalOrg> {
    return await this.repo.findOne(params.id);
  }

  @Post()
  // @UseGuards(AuthGuard('bearer'))
  async createExternalOrg(@Body() newEO: ExternalOrgDTO): Promise<ExternalOrg> {
    return await this.repo.createAndSave(newEO);
  }

  @Put()
  // @UseGuards(AuthGuard('bearer'))
  async updateExternalOrg(@Body() eo: ExternalOrgDTO): Promise<any> {
    return await this.repo.validateAndUpdate(eo);
  }
}
