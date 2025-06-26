import { IsUUID, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAntecedentDetailDto {
  @ApiProperty({
    description:
      'UUID del antecedente del paciente al que pertenece este detalle',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  idAntecedentePaciente: string;

  @ApiProperty({
    description: 'Descripción detallada del antecedente',
    example: 'Alergia conocida a la penicilina.',
    required: false,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
