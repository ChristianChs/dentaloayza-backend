import { IsUUID, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFullAntecedentPatientDto {
  @ApiProperty({ description: 'ID del paciente' })
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @ApiProperty()
  @IsNotEmpty()
  q1_hospitalizado: 'Sí' | 'No';

  @ApiProperty({ required: false })
  @IsOptional()
  q1_porque?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  q1_donde?: string;

  @ApiProperty()
  @IsNotEmpty()
  q2_atencionMedica: 'Sí' | 'No';

  @ApiProperty({ required: false })
  @IsOptional()
  q2_porque?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  q2_donde?: string;

  @ApiProperty()
  @IsNotEmpty()
  q3_alergico: 'Sí' | 'No';

  @ApiProperty({ required: false })
  @IsOptional()
  q3_cuales?: string;

  @ApiProperty()
  @IsNotEmpty()
  q4_hemorragia: 'Sí' | 'No';

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  q5_enfermedades: string[];

  @ApiProperty()
  @IsNotEmpty()
  q6_otraEnfermedad: 'Sí' | 'No';

  @ApiProperty({ required: false })
  @IsOptional()
  q6_cual?: string;

  @ApiProperty()
  @IsNotEmpty()
  q7_medicacionActual: 'Sí' | 'No';

  @ApiProperty({ required: false })
  @IsOptional()
  q7_cual?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  q8_embarazada?: 'Sí' | 'No';

  @ApiProperty({ required: false })
  @IsOptional()
  q8_semanas?: string;

  @ApiProperty()
  @IsNotEmpty()
  q9_hipertenso: 'Sí' | 'No';

  @ApiProperty({ required: false })
  @IsOptional()
  q10_ultimaConsultaDental?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  q11_motivoConsulta?: string;
}
