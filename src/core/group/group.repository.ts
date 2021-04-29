import { EntityRepository, TreeRepository } from 'typeorm';
import { getLogger } from 'log4js';
import { Group } from './group.entity';
import { BadRequestException } from '@nestjs/common';
import { GroupDTO } from './group.dto';

const logger = getLogger('group');

@EntityRepository(Group)
export class GroupRepository extends TreeRepository<Group> {

  async findById(id: string): Promise<Group | null> {
    const g = await this.findOneOrFail(id).catch(_ => {
      throw new BadRequestException('Bad Request', 'Group does not exist: ' + id);
    });
    // The next line recursively load the parents of the Group in question
    // note that these parents do not eagerly load their relations
    await this.findAncestorsTree(g);
    // So this line causes the parents to be recursively loaded with eager relations
    if (g.parent) g.parent = await this.findById(g.parent.id);
    return g;
  }

  async getHierarchy(): Promise<Group[]> {
    return await this.findTrees();
  }

  async createGroup(dto: GroupDTO): Promise<Group> {
    this.validateNew(dto);
    const item: Group = this.create(dto);
    return await this.save( item );
  }

  async updateGroup(dto: GroupDTO): Promise<Group> {
    this.validateExisting(dto);
    const item: Group = await this.preload(dto);
    return await this.save( item );
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
