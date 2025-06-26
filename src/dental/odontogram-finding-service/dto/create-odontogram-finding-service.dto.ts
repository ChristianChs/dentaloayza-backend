import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateOdontogramFindingServiceDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  odontogramFindingUuid: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  dentalTreatmentUuid: string;
}
