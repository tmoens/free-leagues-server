import { EntityRepository, Like, TreeRepository, UpdateResult } from 'typeorm';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';
import { Org } from './org.entity';
import { OrgDTO } from './org.dto';
import { classToClass, classToPlain, plainToClass, plainToClassFromExist } from 'class-transformer';

const logger = getLogger('Org');

@EntityRepository(Org)
export class OrgRepository extends TreeRepository<Org> {

  /**
   *
   * @param dto
   * @param parentId
   */
  async createAndSave(dto: OrgDTO, parentId: string): Promise<any> {
    let o: Org = super.create(dto);
    o.parent = await this.mustExist(parentId);
    o = await super.save( o );
    return await classToPlain(o);
  }

  async validateAndUpdate(dto: OrgDTO): Promise<any> {
    let o: Org = await this.mustExist(dto.id);
    const updatedOrg: Org = plainToClassFromExist(o, dto);
    o = await super.save( updatedOrg );
    return await classToPlain(o);
  }

  async validateAndRemove(dto: OrgDTO): Promise<any> {
    return await super.remove( await this.mustExist(dto.id));
  }

  async validateAndMove(uuid: string, toParentUuid: string): Promise<any> {
    const o: Org = await this.mustExist(uuid);
    const newParent: Org = await this.mustExist(toParentUuid);
    o.parent = newParent;
    return await super.save(o);
  }

  async mustExist(id: string): Promise<Org | null> {
    if (!id) {
      return null;
    } else {
      const o: Org = await this.findOne(id);
      if (o) {
        return o;
      } else {
        const msg = 'Org does not exist. id: ' + id;
        logger.info(msg);
        throw new BadRequestException('Bad Request', msg);
      }
    }
  }
}
