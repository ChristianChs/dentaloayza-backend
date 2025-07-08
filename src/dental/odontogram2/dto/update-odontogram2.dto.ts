import { IsOptional, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOdontogramDto2 {
  @ApiProperty({ description: 'Datos del odontograma (json)', required: false })
  @IsOptional()
  @IsNotEmpty()
  data?: any;

  @ApiProperty({ description: 'ID del paciente', required: false })
  @IsUUID()
  @IsOptional()
  patientId?: string;
}
