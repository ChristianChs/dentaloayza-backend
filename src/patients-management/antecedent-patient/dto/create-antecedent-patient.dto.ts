import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateAntecedentPatientDto {
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @IsUUID()
  @IsNotEmpty()
  idAntecedente: string;
}
