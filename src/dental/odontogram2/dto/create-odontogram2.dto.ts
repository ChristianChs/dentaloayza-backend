import { IsUUID, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOdontogramDto {
  @ApiProperty({ description: 'UUID del paciente' })
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ description: 'Lista de hallazgos', type: Array })
  @IsArray()
  data: any[];
}
