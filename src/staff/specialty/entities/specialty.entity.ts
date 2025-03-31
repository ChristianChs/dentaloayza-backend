import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('especialidades')
export class Specialty extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 250,
    nullable: false,
    unique: true,
  })
  nombre: string;

  @Column('varchar', {
    length: 250,
  })
  descripcion: string;
}
