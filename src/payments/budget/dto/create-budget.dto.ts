import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  nombre: string;

  @IsString()
  nota?: string;

  @IsString()
  @IsEnum(['Creado', 'Pagado', 'Cancelado'])
  estado?: 'Creado' | 'Pagado' | 'Cancelado';

  @IsString()
  @IsUUID()
  idEspecialista: string;
}
