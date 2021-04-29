import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Org } from '../org/org.entity';
import { SportDTO } from '../sport/sport.dto';

export class GroupDTO {
  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  id: string | null;

  @ApiModelPropertyOptional()
  parent: GroupDTO;

  @ApiModelProperty()
  name: string;

  @ApiModelPropertyOptional()
  nameShort?: string;

  @ApiModelPropertyOptional()
  startDate?: Date;

  @ApiModelPropertyOptional()
  endDate?: Date;

  @ApiModelPropertyOptional()
  org?: Org;

  @ApiModelPropertyOptional()
  sport?: SportDTO;

  @ApiModelPropertyOptional()
  effectiveSport?: SportDTO;
}
