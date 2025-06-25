import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEtiquetaDto {
  @ApiProperty({
    description: 'Nombre de la etiqueta',
    example: 'Urgente',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    description: 'Descripción de la etiqueta (opcional)',
    example: 'Etiqueta para citas urgentes.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
