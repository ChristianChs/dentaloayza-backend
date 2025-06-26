import { PartialType } from '@nestjs/swagger';
import { CreateDentalTreatmentDto } from './create-dental-treatment.dto';

export class UpdateDentalTreatmentDto extends PartialType(
  CreateDentalTreatmentDto,
) {}
