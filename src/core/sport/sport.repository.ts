import { EntityRepository, Repository } from 'typeorm';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';
import { classToPlain, plainToClassFromExist } from 'class-transformer';
import { Sport } from './sport.entity';
import { SportDTO } from './sport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalOrgRepository } from '../external-data/external-org/external-org.repository';

const logger = getLogger('Sport');

@EntityRepository(Sport)
export class SportRepository extends Repository<Sport> {

  constructor(
    @InjectRepository(ExternalOrgRepository)
    private readonly externalOrgRepo: ExternalOrgRepository,
  )
  {
    super();
  }

  async findAll(): Promise<any> {
    const items: Sport[] = await this.find({ relations: ['governingBody']});
    return classToPlain(items);
  }

  async createAndSave(dto: SportDTO): Promise<any> {
    const o = await this.validateDTO(dto, true);
    return await this.saveOrFail(o);
  }

  async validateAndRemove(dto: SportDTO): Promise<any> {
    // TODO Validation - do not delete if there are references to it
    return await super.remove( await this.findOrFail(dto.id));
  }

  async validateAndUpdate(dto: SportDTO): Promise<any> {
    const o = await this.validateDTO(dto, false);
    return await this.saveOrFail(o);
  }

  // TODO Should this not be class to plain?
  async findByName(name: string): Promise<Sport> {
    return await this.findOne({ where: {name}});
  }

  async validateDTO(dto: SportDTO, forCreation: boolean): Promise<Sport> {
    let candidate: Sport;
    if (forCreation) {
      if (dto.id) {
        throw new BadRequestException('Bad Request', 'Cannot specify and id when creating a sport');
      } else {
        candidate = new Sport();
      }
    } else {
      candidate = await this.findOrFail(dto.id);
    }

    // Note to future self
    // I tested this out and if the client sends a DTO with an invalid governing
    // organization, it fails. But with a valid one it succeeds with the intended
    // relationship being created.  Same with compoSchema.
    // So, I'm going to forgo validating those two things explicitly.
    candidate = plainToClassFromExist(candidate, dto);

    // NOTE: the call above merges the dto into the candidate. If you merge the
    // dto's lexicon, you can never get rid of any items in the candidate's
    // lexicon.  Soooo, we have to overwrite the lexicon field.
    candidate.lexicon = dto.lexicon;
    return candidate;
  }

  async findOrFail(uuid: string): Promise<Sport> {
    const o: Sport = await this.findOne(uuid);
    if (o) {
      return o;
    } else {
      throw new BadRequestException('Bad Request', 'Object does not exist. id: ' + uuid);
    }
  }

  async saveOrFail(o: Sport): Promise<any> {
    return classToPlain(await this.save(o)
      .catch(error => {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Bad Request', 'Sport name "' + o.name + '" already exists.');
        } else {
          throw new BadRequestException('Bad Request', 'error.message');
        }
      }));
  }
}
