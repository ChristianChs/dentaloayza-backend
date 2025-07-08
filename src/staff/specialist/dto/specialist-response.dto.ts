import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PersonResponseDto } from 'src/staff/person/dto';

export class SpecialistResponseDto {
  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  uuid: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  deletedAt: Date | null;

  @ApiProperty()
  @Expose()
  fechaIngreso: string;

  @ApiProperty()
  @Expose()
  rol: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  user: string;

  @ApiProperty()
  @Expose()
  uuidUser: string;

  @ApiProperty()
  @Expose()
  @Type(() => PersonResponseDto)
  persona: PersonResponseDto;
}
