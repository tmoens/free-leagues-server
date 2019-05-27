import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonRepository } from './person.repository';
import { Person } from './person.entity';
import { PersonDTO } from './person.dto';

@Controller('person')
export class PersonController {
  constructor(
    @InjectRepository(PersonRepository)
    private readonly repo: PersonRepository,
  ) {}

  @Get()
  // @UseGuards(AuthGuard('bearer'))
  async findAll(): Promise<Person[]> {
    return await this.repo.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('bearer'))
  async findById(@Param() params): Promise<Person> {
    return await this.repo.findOne(params.id);
  }

  @Post()
  // @UseGuards(AuthGuard('bearer'))
  async createPerson(@Body() newObj: PersonDTO): Promise<Person> {
    return await this.repo.createAndSave(newObj);
  }

  @Put()
  // @UseGuards(AuthGuard('bearer'))
  async updatePerson(@Body() eo: PersonDTO): Promise<any> {
    return await this.repo.validateAndUpdate(eo);
  }

}
