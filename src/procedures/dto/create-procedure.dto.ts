import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProcedureDto {
  @IsString()
  @MinLength(3)
  denominacion: string;

  @IsString()
  @MinLength(10)
  descripcion: string;

  @IsNotEmpty({ message: 'El precio base no debe estar vacío' })
  @IsNumber({}, { message: 'El precio base debe ser un número válido' })
  @IsPositive({ message: 'El precio base debe ser un número mayor a cero' })
  precioBase: number;
}
