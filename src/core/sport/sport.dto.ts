import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ExternalOrgDTO } from '../external-data/external-org/external-org.dto';

export class SportDTO {
  @ApiModelProperty({
    maxLength: 36,
    minLength: 36,
  })
  id: string | null;

  @ApiModelProperty()
  name: string;

  @ApiModelPropertyOptional()
  description?: string;

  @ApiModelPropertyOptional()
  lexicon?: object;

  @ApiModelPropertyOptional()
  governedBy?: ExternalOrgDTO;
}
