import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSpecialistDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  idPersona: string;
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  idEspecialidad: string;

  @IsDateString()
  fechaIngreso: string;
}
