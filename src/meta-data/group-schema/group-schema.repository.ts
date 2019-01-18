import { EntityRepository, Like, TreeRepository } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { GroupSchema } from './group-schema.entity';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';

const logger = getLogger('groupSchema');

@EntityRepository(GroupSchema)
export class GroupSchemaRepository extends TreeRepository<GroupSchema> {

  /**
   * Create a GroupSchema
   * @param dto
   */
  async createAndSave(dto: GSDTO): Promise<GroupSchema> {
    const gs: GroupSchema = new GroupSchema();
    if (dto.id) {
      gs.parent = await this.findOne(dto.id);
      if (!gs.parent) {
        const msg = 'Parent of new group schema does not exist. id: ' + dto.id;
        logger.info(msg);
        throw new BadRequestException('Bad Request', msg);
      }
    }
    gs.description = dto.description;
    gs.genericGroupName = dto.genericGroupName;
    gs.genericGroupNameShort = dto.genericGroupNameShort;
    gs.examples = dto.examples;
    return await super.save(gs);
  }

  // TODO Just a test, this probably needs to go away.
  async findByName(name: string): Promise<GroupSchema[]> {
    return await this.find({genericGroupName: Like(`%${name}%`)});
  }
}

export class GSDTO {
  // I'm doing something wrong here.  Nevertheless.
  // When creating a Group Schema, the id is the id of the parent.
  // When updating the Group Schema the id is the schema's own id.
  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  id: string | null;

  @ApiModelProperty()
  genericGroupName: string;

  @ApiModelPropertyOptional()
  genericGroupNameShort?: string;

  @ApiModelPropertyOptional()
  examples?: string;

  @ApiModelPropertyOptional()
  description?: string;
}

export class GSId {
  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  id: string;
}

export class PartialNameQueryParams {
  @ApiModelProperty()
  partialName: string;
}