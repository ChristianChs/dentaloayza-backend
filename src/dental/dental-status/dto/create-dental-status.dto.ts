import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { DentalStatusType } from '../../enums/dental-status-type.enum';

export class CreateDentalStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiProperty({ enum: DentalStatusType })
  @IsNotEmpty()
  statusType: DentalStatusType;
}
