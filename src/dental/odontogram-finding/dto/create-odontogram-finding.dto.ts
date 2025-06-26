import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateOdontogramFindingDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  odontogramUuid: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  toothNumber: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  findingTypeDefinitionUuid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}
