import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreatePatientTagDto {
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @IsUUID()
  @IsNotEmpty()
  idEtiqueta: string;
}
