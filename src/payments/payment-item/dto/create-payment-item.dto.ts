import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreatePaymentItemDto {
  @IsNotEmpty({ message: 'El monto abonado no debe estar vacío' })
  @IsNumber({}, { message: 'El monto abonado debe ser un número válido' })
  @IsPositive({ message: 'El monto abonado debe ser un número mayor a cero' })
  montoAbonado: number;

  @IsUUID()
  uuidPago: string;

  @IsUUID()
  uuidPresupuestoItem: string;
}
export class CreatePaymentItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentItemDto)
  items: CreatePaymentItemDto[];
}
