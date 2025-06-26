import { PartialType } from '@nestjs/swagger';
import { CreateOdontogramFindingDto } from './create-odontogram-finding.dto';

export class UpdateOdontogramFindingDto extends PartialType(
  CreateOdontogramFindingDto,
) {}
