import { IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PatientPaymentStatus } from '../../enums/patient-payment-status.enum';

export class CreatePatientDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idPersona: string;

  @ApiProperty({ enum: PatientPaymentStatus })
  @IsEnum(PatientPaymentStatus)
  @IsNotEmpty()
  estadoPago: PatientPaymentStatus;
}
