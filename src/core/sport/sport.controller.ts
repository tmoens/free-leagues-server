import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportRepository } from './sport.repository';
import { Sport } from './sport.entity';
import { SportDTO } from './sport.dto';

@Controller('Sport')
export class SportController {
  constructor(
    @InjectRepository(SportRepository)
    private readonly repo: SportRepository,
  ) {}

  @Get()
  // @UseGuards(AuthGuard('bearer'))
  async findAll(): Promise<Sport[]> {
    return await this.repo.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('bearer'))
  async findById(@Param() params): Promise<Sport> {
    return await this.repo.findOne(params.id);
  }

  @Post()
  // @UseGuards(AuthGuard('bearer'))
  async createSport(@Body() newObj: SportDTO): Promise<Sport> {
    return await this.repo.createAndSave(newObj);
  }

  @Put()
  // @UseGuards(AuthGuard('bearer'))
  async updateSport(@Body() eo: SportDTO): Promise<any> {
    return await this.repo.validateAndUpdate(eo);
  }

}
