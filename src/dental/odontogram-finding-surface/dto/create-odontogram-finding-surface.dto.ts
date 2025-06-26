import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateOdontogramFindingSurfaceDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  odontogramFindingUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  dentalSurfaceTypeDefinitionUuid: string; // Refers to DentalSurfaceTypeDefinition
}
