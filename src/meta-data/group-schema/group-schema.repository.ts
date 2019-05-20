import { EntityRepository, Like, TreeRepository } from 'typeorm';
import { GroupSchema } from './group-schema.entity';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';
import { GroupSchemaDTO } from './group-schema.dto';

const logger = getLogger('groupSchema');

@EntityRepository(GroupSchema)
export class GroupSchemaRepository extends TreeRepository<GroupSchema> {

  /**
   * Create a GroupSchema
   * @param dto
   */
  async createAndSave(dto: GroupSchemaDTO): Promise<GroupSchema> {
    if (dto.id) {
      throw new BadRequestException('Bad Request',
        'Cannot create an external organization with an existing id');
    }
    const item: GroupSchema = super.create(dto);
    if (dto.parentId) {
      item.parent = await this.findOne(dto.parentId);
      if (!item.parent) {
        const msg = 'Parent of new group schema does not exist. id: ' + dto.id;
        logger.info(msg);
        throw new BadRequestException('Bad Request', msg);
      }
    }
    return await super.save(item).catch(
      error => {
        throw new BadRequestException('Bad Request', error.error);
      });
  }

  // TODO Just a test, this probably needs to go away.
  async findByName(name: string): Promise<GroupSchema[]> {
    return await this.find({genericGroupName: Like(`%${name}%`)});
  }
}