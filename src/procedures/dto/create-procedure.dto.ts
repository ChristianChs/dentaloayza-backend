import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProcedureDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  denominacion: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El precio base no debe estar vacío' })
  @IsNumber({}, { message: 'El precio base debe ser un número válido' })
  @IsPositive({ message: 'El precio base debe ser un número mayor a cero' })
  precioBase: number;
}
