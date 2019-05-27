import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class PersonDTO {
  @ApiModelProperty({
    maxLength: 36,
    minLength: 36,
  })
  id: string | null;

  @ApiModelProperty()
  numericId: number;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  selfSelectedId: string;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  phone: string;

  @ApiModelPropertyOptional()
  dob: Date;

  // TODO externalIdentities
}
