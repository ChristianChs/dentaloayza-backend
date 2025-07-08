import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSpecialistDto } from './create-specialist.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSpecialistDto extends PartialType(CreateSpecialistDto) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;
}
