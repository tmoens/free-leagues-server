import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

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
}
