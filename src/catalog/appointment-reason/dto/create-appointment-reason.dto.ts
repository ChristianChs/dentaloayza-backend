import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMotivoCitaDto {
  @ApiProperty({
    description: 'Nombre del motivo de la cita',
    example: 'Consulta de rutina',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    description: 'Descripción del motivo de la cita (opcional)',
    example: 'Chequeo anual y limpieza.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
