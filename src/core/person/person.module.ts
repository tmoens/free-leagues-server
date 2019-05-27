import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonRepository } from './person.repository';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({  imports: [
    TypeOrmModule.forFeature([Person, PersonRepository]),
  ],
  providers: [
    PersonService,
  ],
  controllers: [
    PersonController,
  ],
  exports: [
    PersonModule,
  ],
})
export class PersonModule {}
