import { EntityRepository, Repository, TreeRepository } from 'typeorm';
import { getLogger } from 'log4js';
import { GroupSchema } from '../../meta-data/group-schema/group-schema.entity';
import { Group } from './group.entity';

const logger = getLogger('groupSchema');

@EntityRepository(Group)
export class GroupRepository extends TreeRepository<Group> {
  async createAndSave(gDTO: GroupDTO): Promise<Group | null> {
    // TODO Check that there is a valid GroupSchema Id in the DTO
    // TODO maybe a generic way to validate the presence of an instance in a repository.
    const g = new Group();
    // First cases - we are the top of the hierarchy (no parent).
    // In this case we have a hierarchy name and examples.
    if (!gDTO.parentId) {
      g.parent = null;
    }
    // Second case - we have a parentId, so we are inside a hierarchy
    else {
      g.parent = await this.findOne(gDTO.parentId);
      logger.info('parentId: ' + gDTO.parentId + '. Parent: ' + JSON.stringify(g.parent));
      if (!g.parent) {
        // TODO Send message back to client...
        const msg = `Attempt to create a group schema with unknown parentId: gsDTO.parentId`;
        logger.error(msg);
        return null;
      }
    }
    g.name = gDTO.name;
    g.nameShort = gDTO.nameShort;
    return await this.manager.save(g);
  }
}

export class GroupDTO {
  id: string;
  schemaId: GroupSchema;
  name: string;
  nameShort: string;
  parentId: string | null;
}