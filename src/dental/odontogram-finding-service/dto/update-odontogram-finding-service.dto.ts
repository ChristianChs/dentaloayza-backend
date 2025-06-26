import { PartialType } from '@nestjs/swagger';
import { CreateOdontogramFindingServiceDto } from './create-odontogram-finding-service.dto';

export class UpdateOdontogramFindingServiceDto extends PartialType(
  CreateOdontogramFindingServiceDto,
) {}
