import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { MetodoPago, TipoComprobante } from '../enum';

export class CreatePaymentDto {
  @IsString()
  concepto: string;

  @IsNotEmpty({ message: 'El monto no debe estar vacío' })
  @IsNumber({}, { message: 'El monto debe ser un número válido' })
  @IsPositive({ message: 'El monto debe ser un número mayor a cero' })
  monto: number;

  @IsEnum(TipoComprobante, {
    message: `El tipo de comprobante debe ser uno de los siguientes: ${Object.values(TipoComprobante).join(', ')}`,
  })
  comprobante: TipoComprobante;

  @IsEnum(MetodoPago, {
    message: `El método de pago debe ser uno de los siguientes: ${Object.values(MetodoPago).join(', ')}`,
  })
  metodoPago: MetodoPago;

  @IsUUID()
  uuidEspecialista: string;
}
