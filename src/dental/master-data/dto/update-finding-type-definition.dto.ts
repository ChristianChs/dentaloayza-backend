import { PartialType } from '@nestjs/swagger';
import { CreateFindingTypeDefinitionDto } from './create-finding-type-definition.dto';

export class UpdateFindingTypeDefinitionDto extends PartialType(
  CreateFindingTypeDefinitionDto,
) {}
