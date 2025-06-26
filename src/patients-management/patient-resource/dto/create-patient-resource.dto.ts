import { IsUUID, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientResourceDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idPaciente: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  idSpecialist: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mime?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  directorio?: string;
}
