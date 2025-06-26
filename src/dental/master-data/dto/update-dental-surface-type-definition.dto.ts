import { PartialType } from '@nestjs/swagger';
import { CreateDentalSurfaceTypeDefinitionDto } from './create-dental-surface-type-definition.dto';

export class UpdateDentalSurfaceTypeDefinitionDto extends PartialType(
  CreateDentalSurfaceTypeDefinitionDto,
) {}
