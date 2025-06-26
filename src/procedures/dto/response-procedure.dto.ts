import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProcedureResponseDto {
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
  denominacion: string;

  @ApiProperty()
  @Expose()
  descripcion: string;

  @ApiProperty()
  @Expose()
  precioBase: number;
}
