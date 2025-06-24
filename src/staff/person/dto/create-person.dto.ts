import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { TipoDocumento } from '../enums/document-type.enum';
import { Gender } from '../enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  @IsEnum(TipoDocumento, { message: 'Tipo de documento no válido' })
  tipoDocumento: TipoDocumento;

  @ApiProperty()
  @IsString()
  @Length(8, 20)
  numeroDocumento: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidoPaterno: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidoMaterno: string;

  @ApiProperty()
  @IsDateString()
  fechaNacimiento: string;

  @ApiProperty()
  @IsEnum(Gender, { message: 'Tipo no válido' })
  sexo: Gender;

  @ApiProperty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @Matches(/^\d{9}$/, {
    message: 'El teléfono debe contener 9 dígitos numéricos',
  })
  telefono: string;
}
