import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ExternalOrgDTO {
  @ApiModelProperty({
    maxLength: 36,
    minLength: 36,
  })
  id: string | null;

  @ApiModelProperty()
  name: string;

  @ApiModelPropertyOptional()
  nameShort?: string;

  @ApiModelPropertyOptional()
  url?: string;
}
