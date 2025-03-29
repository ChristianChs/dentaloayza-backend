import { IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(5)
  denominacion: string;

  @IsString()
  @MinLength(5)
  descripcion: string;
}
