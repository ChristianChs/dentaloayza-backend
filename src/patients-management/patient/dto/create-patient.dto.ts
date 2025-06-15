import { IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
import { PatientPaymentStatus } from '../../enums/patient-payment-status.enum';

export class CreatePatientDto {
  @IsUUID()
  @IsNotEmpty()
  idPersona: string;

  @IsEnum(PatientPaymentStatus)
  @IsNotEmpty()
  estadoPago: PatientPaymentStatus;
}
