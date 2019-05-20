import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';
import { classToPlain, plainToClassFromExist } from 'class-transformer';
import { ExternalOrg } from './external-org.entity';
import { ExternalOrgDTO } from './external-org.dto';

const logger = getLogger('ExternalOrg');

@EntityRepository(ExternalOrg)
export class ExternalOrgRepository extends Repository<ExternalOrg> {

  async findAll(): Promise<any> {
    const externalOrgs: ExternalOrg[] = await this.find();
    return classToPlain(externalOrgs);
  }

  /**
   *
   * @param dto
   */
  async createAndSave(dto: ExternalOrgDTO): Promise<any> {
    if (dto.id) {
      throw new BadRequestException('Bad Request', 'Cannot create an external organization with an existing id');
    }
    let item: ExternalOrg = super.create(dto);
    item = await super.save(item)
      .catch(error => {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Bad Request', 'External organization name "' + dto.name + '" already exists.');
        } else {
          throw new BadRequestException('Bad Request', 'error.message');
        }
      });
    return await classToPlain(item);
  }

  async validateAndRemove(dto: ExternalOrgDTO): Promise<any> {
    // TODO Validation - do not delete if there are references to it
    return await super.remove( await this.findOrFail(dto.id));
  }

  async validateAndUpdate(dto: ExternalOrgDTO): Promise<any>{
    let eo: ExternalOrg = await this.findOrFail(dto.id);
    eo = plainToClassFromExist(eo, dto);
    return classToPlain(await this.save(eo)
      .catch(error => {
        if (error.code === 'ER_DUP_ENTRY') {
          throw new BadRequestException('Bad Request', 'External organization name "' + dto.name + '" already exists.');
        } else {
          throw new BadRequestException('Bad Request', 'error.message');
        }
      }));
  }

  async findByName(name: string): Promise<ExternalOrg> {
    return await this.findOne({ where: {name}});
  }

  async findOrFail(id: string): Promise<ExternalOrg | null> {
    const o: ExternalOrg = await this.findOne(id);
    if (o) {
      return o;
    } else {
      throw new BadRequestException('Bad Request', 'External organization does not exist. id: ' + id);
    }
  }
}
