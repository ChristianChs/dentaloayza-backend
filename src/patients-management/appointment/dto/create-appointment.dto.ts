import { IsUUID, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idSpecialist: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idMotivoCita: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fechaCita: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @ApiProperty({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  estadoCita: AppointmentStatus;
}
