import { PartialType } from '@nestjs/mapped-types';
import { CreateFullAntecedentPatientDto } from './create-antecedent-patient.dto';

export class UpdateAntecedentPatientDto extends PartialType(
  CreateFullAntecedentPatientDto,
) {}
