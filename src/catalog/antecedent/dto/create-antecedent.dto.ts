import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAntecedenteDto {
  @ApiProperty({
    description: 'Nombre del antecedente',
    example: 'Alergia a la penicilina',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    description: 'Descripción del antecedente (opcional)',
    example: 'El paciente es alérgico a este medicamento.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
