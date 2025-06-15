import { PartialType } from '@nestjs/mapped-types';
import { CreateAntecedentDetailDto } from './create-antecedent-detail.dto';

export class UpdateAntecedentDetailDto extends PartialType(
  CreateAntecedentDetailDto,
) {}
