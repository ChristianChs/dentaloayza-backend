import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PersonResponseDto {
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
  tipoDocumento: string;

  @ApiProperty()
  @Expose()
  numeroDocumento: string;

  @ApiProperty()
  @Expose()
  nombre: string;

  @ApiProperty()
  @Expose()
  apellidoPaterno: string;

  @ApiProperty()
  @Expose()
  apellidoMaterno: string;

  @ApiProperty()
  @Expose()
  fechaNacimiento: Date;

  @ApiProperty()
  @Expose()
  sexo: string;

  @ApiProperty()
  @Expose()
  direccion: string;

  @ApiProperty()
  @Expose()
  telefono: string;
}
