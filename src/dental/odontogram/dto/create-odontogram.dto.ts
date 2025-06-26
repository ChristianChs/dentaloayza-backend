import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateOdontogramDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  patientUuid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  notes: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  status?: string;
}
