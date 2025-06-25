import { Expose } from 'class-transformer';

export class ProcedureResponseDto {
  @Expose()
  isActive: boolean;

  @Expose()
  uuid: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date | null;

  @Expose()
  denominacion: string;

  @Expose()
  descripcion: string;

  @Expose()
  precioBase: number;
}
