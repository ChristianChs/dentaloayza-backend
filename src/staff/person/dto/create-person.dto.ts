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

export class CreatePersonDto {
  @IsEnum(TipoDocumento, { message: 'Tipo de documento no válido' })
  tipoDocumento: TipoDocumento;

  @IsString()
  @Length(8, 20)
  numeroDocumento: string;

  @IsString()
  @MinLength(3)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellidoPaterno: string;

  @IsNotEmpty()
  @IsString()
  apellidoMaterno: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsEnum(Gender, { message: 'Tipo no válido' })
  sexo: Gender;

  @IsString()
  direccion: string;

  @Matches(/^\d{9}$/, {
    message: 'El teléfono debe contener 9 dígitos numéricos',
  })
  telefono: string;
}
