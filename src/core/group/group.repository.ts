import { EntityRepository, Repository, TreeRepository } from 'typeorm';
import { getLogger } from 'log4js';
import { Group } from './group.entity';
import { BadRequestException } from '@nestjs/common';
import { GroupDTO } from './group.dto';
import { classToPlain, plainToClass } from 'class-transformer';

const logger = getLogger('group');

@EntityRepository(Group)
export class GroupRepository extends TreeRepository<Group> {

  async createGroup(dto: GroupDTO): Promise<any> {
    this.validateNew(dto);
    let item: Group = this.create(dto);
    item = await this.save( item );
    return await classToPlain(item);
  }

  async updateGroup(dto: GroupDTO): Promise<any> {
    this.validateExisting(dto);
    let item: Group = await this.preload(dto);
    item = await this.save( item );
    return await classToPlain(item);
  }

  // new group should not have an id as they are auto generated
  validateNew(dto: GroupDTO) {
    if (dto.id) {
      throw new BadRequestException('Bad Request', 'Cannot *create* an object with a id');
    }
  }

  validateExisting(dto: GroupDTO) {
    // nothing to validate yet
  }

  async mustExist(uuid: string): Promise<Group | null> {
    const o: Group = await this.findOne(uuid);
    if (o) {
      return o;
    } else {
      const msg = 'Group does not exist. id: ' + uuid;
      logger.info(msg);
      throw new BadRequestException('Bad Request', msg);
    }
  }
}

