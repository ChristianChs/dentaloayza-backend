import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateBudgetItemDto {
  @IsPositive()
  @IsNumber()
  cantidad: number;

  @IsPositive()
  @IsNumber()
  precioUnitario: number;

  @IsString()
  @IsUUID()
  idProcedimiento: string;

  @IsString()
  @IsUUID()
  idPresupuesto: string;
}
export class CreateBudgetItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBudgetItemDto)
  items: CreateBudgetItemDto[];
}
