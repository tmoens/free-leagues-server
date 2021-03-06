import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class OrgDTO {
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

  @ApiModelPropertyOptional()
  nameShort?: string;
}
