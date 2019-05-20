import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

// For creating and updating group schemas.
export class GroupSchemaDTO {
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
  genericGroupName: string;

  @ApiModelPropertyOptional()
  genericGroupNameShort?: string;

  @ApiModelPropertyOptional()
  examples?: string;

  @ApiModelPropertyOptional()
  description?: string;
}

export class PartialNameQueryParams {
  @ApiModelProperty()
  partialName: string;
}