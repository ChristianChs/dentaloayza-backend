import { IsUUID, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

export class CreateAppointmentDto {
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @IsUUID()
  @IsNotEmpty()
  idSpecialist: string;

  @IsUUID()
  @IsNotEmpty()
  idMotivoCita: string;

  @IsString()
  @IsNotEmpty()
  fechaCita: string;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  estadoCita: AppointmentStatus;
}
