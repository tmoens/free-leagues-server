import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

/*
   These are classes that will be used in many of the APIs.
 */
export class UUID {
  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  uuid: string;
}

export class MoveInTree {
  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  uuid: string;

  @ApiModelPropertyOptional({
    maxLength: 36,
    minLength: 36,
  })
  toParentUuid: string;
}

export class SearchString {
  @ApiModelProperty()
  searchString: string;
}
