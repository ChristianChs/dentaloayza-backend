import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAntecedentPatientDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idAntecedente: string;
}
