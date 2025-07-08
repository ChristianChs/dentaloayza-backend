import { IsUUID, IsNotEmpty, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OdontogramType } from '../entities/odontogram2.entity';

export class CreateOdontogramDto2 {
  @ApiProperty({ description: 'UUID del paciente' })
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({
    description: 'Tipo de odontograma',
    enum: OdontogramType,
    example: 'Permanente',
  })
  @IsEnum(OdontogramType)
  @IsNotEmpty()
  type: OdontogramType;

  @ApiProperty({ description: 'Lista de hallazgos', type: Array })
  @IsArray()
  data: any[];
}
