import { BaseEntity } from 'src/common/entities/base.entity';
import { Specialist } from 'src/staff/specialist/entities/specialist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Specialist, (specialist) => specialist.especialidad)
  especialistas: Specialist[];
}
