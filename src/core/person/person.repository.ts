import { EntityRepository, Repository } from 'typeorm';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';
import { classToPlain, plainToClassFromExist } from 'class-transformer';
import { Person } from './person.entity';
import { PersonDTO } from './person.dto';
import { isEmailValid } from '../utils/validation-functions';

const logger = getLogger('Person');

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {

  constructor()
  {
    super();
  }

  async findAll(): Promise<any> {
    const items: Person[] = await this.find();
    return classToPlain(items);
  }

  async createAndSave(dto: PersonDTO): Promise<any> {
    const o = await this.validateDTO(dto, true);
    return await this.saveOrFail(o);
  }

  async validateAndRemove(dto: PersonDTO): Promise<any> {
    // TODO Validation - do not delete if there are references to it
    return await super.remove( await this.findOrFail(dto.id));
  }

  async validateAndUpdate(dto: PersonDTO): Promise<any> {
    const o = await this.validateDTO(dto, false);
    return await this.saveOrFail(o);
  }

  async validateDTO(dto: PersonDTO, forCreation: boolean): Promise<Person> {
    let candidate: Person;
    if (forCreation) {
      if (dto.id || dto.numericId) {
        throw new BadRequestException('Bad Request', 'Cannot specify an id for a new person.');
      } else if (!dto.email || !isEmailValid(dto.email)) {
        throw new BadRequestException('Bad Request', 'New person must have a valid email.');
      } else {
        const check = await this.findByEmail(dto.email);
        if (check) {
          throw new BadRequestException('Bad Request', 'A person with email ' + dto.email + ' already exists.');
        }
        candidate = new Person();
      }
    } else {
      candidate = await this.findOrFail(dto.id);
    }

    candidate = plainToClassFromExist(candidate, dto);
    return candidate;
  }

  async findOrFail(uuid: string): Promise<Person> {
    const o: Person = await this.findOne({id: uuid});
    if (o) {
      return o;
    } else {
      throw new BadRequestException('Bad Request', 'Object does not exist. id: ' + uuid);
    }
  }

  async findByEmail(email: string): Promise<Person | null> {
    return await this.findOne({ where: { email } });
  }

  async saveOrFail(o: Person): Promise<any> {
    return classToPlain(await this.save(o)
      .catch(error => {
          throw new BadRequestException('Bad Request', 'error.message');
      }));
  }
}
