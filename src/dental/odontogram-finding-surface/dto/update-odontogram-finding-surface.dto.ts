import { PartialType } from '@nestjs/swagger';
import { CreateOdontogramFindingSurfaceDto } from './create-odontogram-finding-surface.dto';

export class UpdateOdontogramFindingSurfaceDto extends PartialType(
  CreateOdontogramFindingSurfaceDto,
) {}
