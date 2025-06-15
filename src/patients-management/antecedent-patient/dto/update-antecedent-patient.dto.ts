import { PartialType } from '@nestjs/mapped-types';
import { CreateAntecedentPatientDto } from './create-antecedent-patient.dto';

export class UpdateAntecedentPatientDto extends PartialType(
  CreateAntecedentPatientDto,
) {}
