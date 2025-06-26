import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientTagDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idEtiqueta: string;
}
