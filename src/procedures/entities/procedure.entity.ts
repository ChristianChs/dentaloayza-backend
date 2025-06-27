import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('procedimientos')
export class Procedure extends BaseEntity {
  @ApiProperty()
  @Column('varchar', {
    length: 250,
    name: 'denominacion',
    nullable: false,
  })
  denominacion: string;
  
  @ApiProperty()
  @Column('varchar', {
    length: 500,
    name: 'descripcion',
    nullable: false,
  })
  descripcion: string;
  
  @ApiProperty()
  @Column('decimal', {
    name: 'precio_base',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  precioBase: number;
}
