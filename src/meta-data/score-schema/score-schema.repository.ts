import { EntityRepository, Like,  TreeRepository } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { getLogger } from 'log4js';
import { BadRequestException } from '@nestjs/common';
import { ScoreSchema } from './score-schema.entity';

const logger = getLogger('ScoreSchema');

@EntityRepository(ScoreSchema)
export class ScoreSchemaRepository extends TreeRepository<ScoreSchema> {

  /**
   * Create a ScoreSchema
   * @param dto
   */
  async createAndSave(dto: SSDTO): Promise<ScoreSchema> {
    const ss: ScoreSchema = new ScoreSchema();
    if (dto.parentId) {
      ss.parent = await this.findOne(dto.parentId);
      if (!ss.parent) {
        const msg = 'Parent of new group schema does not exist. id: ' + dto.parentId;
        logger.info(msg);
        throw new BadRequestException('Bad Request', msg);
      }
    }
    ss.description = dto.description;
    return await this.save(ss);
  }
}

export class SSDTO {
  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  id: string | null;

  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  parentId: string | null;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  units: string;

  @ApiModelPropertyOptional()
  fistTo: number;

  @ApiModelPropertyOptional()
  winBy: number;

  @ApiModelPropertyOptional()
  tiebreakerAt: number;

  @ApiModelProperty()
  partialScoresOk: boolean;

  @ApiModelProperty()
  tiesAllowed: boolean;

  @ApiModelPropertyOptional()
  genericGroupNameShort?: string;
}