import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFullAntecedentPatientDto {
  @ApiProperty({ description: 'ID del paciente' })
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @ApiProperty({
    description: '¿Es alérgico a algún medicamento?',
    example: 'Sí',
  })
  @IsString()
  @IsNotEmpty()
  q1_alergicoMedicamento: string;

  @ApiProperty({
    description: '¿A cuál medicamento?',
    example: 'Penicilina',
    required: false,
  })
  @IsString()
  @IsOptional()
  q2_cualMedicamento?: string;

  @ApiProperty({ description: '¿Es alérgico a otra sustancia?', example: 'Sí' })
  @IsString()
  @IsNotEmpty()
  q3_alergico: string;

  @ApiProperty({
    description: '¿A cuál sustancia?',
    example: 'Polvo, Polen',
    required: false,
  })
  @IsString()
  @IsOptional()
  q3_cuales?: string;

  @ApiProperty({ description: '¿Ha estado hospitalizado?', example: 'No' })
  @IsString()
  @IsNotEmpty()
  q4_hospitalizado: string;

  @ApiProperty({ description: '¿Sufre alguna enfermedad?', example: 'Sí' })
  @IsString()
  @IsNotEmpty()
  q5_enfermedad: string;

  @ApiProperty({
    description: '¿Qué enfermedades padece?',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  q5_enfermedades?: string[];

  @ApiProperty({ description: '¿Sufre de hemorragias?', example: 'No' })
  @IsString()
  @IsNotEmpty()
  q6_hemorragias: string;

  @ApiProperty({ description: '¿Está bajo tratamiento médico?', example: 'Sí' })
  @IsString()
  @IsNotEmpty()
  q7_tratamiento: string;

  @ApiProperty({ description: '¿Qué tratamiento sigue?', required: false })
  @IsString()
  @IsOptional()
  q7_tratamientoCual?: string;

  @ApiProperty({
    description: '¿Toma medicamentos actualmente?',
    example: 'Sí',
  })
  @IsString()
  @IsNotEmpty()
  q8_medicamento: string;

  @ApiProperty({ description: '¿Qué medicamentos toma?', required: false })
  @IsString()
  @IsOptional()
  q8_medicamentoCual?: string;

  @ApiProperty({
    description: '¿Tiene antecedentes familiares de enfermedades?',
    example: 'No',
  })
  @IsString()
  @IsNotEmpty()
  q9_antecedentesFamiliares: string;

  @ApiProperty({
    description: '¿Padece de enfermedades bucales?',
    example: 'Sí',
  })
  @IsString()
  @IsNotEmpty()
  q10_enfermedadBucal: string;

  @ApiProperty({
    description: '¿Qué enfermedades bucales tiene?',
    required: false,
  })
  @IsString()
  @IsOptional()
  q10_enfermedadBucalCual?: string;

  @ApiProperty({ description: '¿Es fumador?', example: 'No' })
  @IsString()
  @IsNotEmpty()
  q11_fumador: string;
}
