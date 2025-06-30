import { IsNumber, IsPositive } from 'class-validator';

export class UpdateBudgetItemDto {
  @IsPositive()
  @IsNumber()
  cantidad: number;
}
