import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSpecialistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  uuidPersona: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  idEspecialidad: string;

  @ApiProperty()
  @IsDateString()
  fechaIngreso: string;
}
