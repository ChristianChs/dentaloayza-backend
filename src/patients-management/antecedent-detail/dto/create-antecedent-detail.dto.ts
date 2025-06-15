import { IsUUID, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAntecedentDetailDto {
  @IsUUID()
  @IsNotEmpty()
  idAntecedentePaciente: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
