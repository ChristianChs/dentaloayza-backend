import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientTagDto } from './create-patient-tag.dto';

export class UpdatePatientTagDto extends PartialType(CreatePatientTagDto) {}
