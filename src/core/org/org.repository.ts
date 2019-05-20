import { EntityRepository, TreeRepository } from 'typeorm';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';
import { Org } from './org.entity';
import { OrgDTO } from './org.dto';
import { classToPlain, plainToClassFromExist } from 'class-transformer';

const logger = getLogger('Org');

@EntityRepository(Org)
export class OrgRepository extends TreeRepository<Org> {

  async findAll(): Promise<any> {
    const items: Org[] = await this.find();
    return classToPlain(items);
  }

  async createAndSave(dto: OrgDTO): Promise<any> {
    if (dto.id) {
      throw new BadRequestException('Bad Request', 'Cannot create an Organization with an existing id');
    }
    let item: Org = super.create(dto);
    // If the new item has a parent specified, that parent has to exist!
    if (dto.parentId) {
      item.parent = await this.mustExist(dto.parentId);
    }
    item = await super.save( item );
    return await classToPlain(item);
  }

  async validateAndUpdate(dto: OrgDTO): Promise<any> {
    let item: Org = await this.mustExist(dto.id);
    const updatedOrg: Org = plainToClassFromExist(item, dto);
    item = await super.save( updatedOrg );
    // If the new item has a parent specified, and that parent is
    // different from the current parent for the org, then
    // we are doing a move in the tree and the new parent
    // has to exist.
    if (dto.parentId) {
      if (!item.parent || item.parent.id !== dto.parentId) {
        item.parent = await this.mustExist(dto.parentId);
      }
    }
    item = await super.save( item );
    return await classToPlain(item);
  }

  async validateAndRemove(dto: OrgDTO): Promise<any> {
    return await super.remove( await this.mustExist(dto.id));
  }

  async mustExist(uuid: string): Promise<Org | null> {
    const o: Org = await this.findOne(uuid);
    if (o) {
      return o;
    } else {
      const msg = 'Org does not exist. id: ' + uuid;
      logger.info(msg);
      throw new BadRequestException('Bad Request', msg);
    }
  }

}
