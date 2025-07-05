import {
  IsUUID,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PatientStatus } from '../../enums/patient-payment-status.enum';

export class CreatePatientDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idPersona: string;

  @ApiProperty({ enum: PatientStatus })
  @IsEnum(PatientStatus)
  @IsNotEmpty()
  estado: PatientStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nota?: string;
}
