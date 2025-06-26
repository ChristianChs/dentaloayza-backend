import { PartialType } from '@nestjs/swagger';
import { CreateCariesDetailDefinitionDto } from './create-caries-detail-definition.dto';

export class UpdateCariesDetailDefinitionDto extends PartialType(
  CreateCariesDetailDefinitionDto,
) {}
