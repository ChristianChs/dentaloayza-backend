import { IsUUID, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePatientResourceDto {
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @IsUUID()
  @IsNotEmpty()
  idSpecialist: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  mime?: string;

  @IsString()
  @IsOptional()
  directorio?: string;
}
