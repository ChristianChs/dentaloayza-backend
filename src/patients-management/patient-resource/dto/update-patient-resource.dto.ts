import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientResourceDto } from './create-patient-resource.dto';

export class UpdatePatientResourceDto extends PartialType(
  CreatePatientResourceDto,
) {}
