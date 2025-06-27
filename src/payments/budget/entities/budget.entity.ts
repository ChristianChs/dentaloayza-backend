import { BaseEntity } from 'src/common/entities/base.entity';
import { Specialist } from 'src/staff/specialist/entities/specialist.entity';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Budget extends BaseEntity {
  @Column('varchar', {
    length: 250,
    name: 'nombre',
    nullable: false,
  })
  nombre: string;

  @Column('varchar', {
    length: 50,
    name: 'codigo',
    nullable: false,
  })
  codigo: string;

  @Column('enum', {
    enum: ['Creado', 'Pagado', 'Cancelado'],
    default: 'Creado',
  })
  estado: string;

  @Column('varchar', {
    length: 500,
    nullable: true,
  })
  nota: string;

  @ManyToOne(() => Specialist, (especialista) => especialista.budget)
  especialista: Specialist;

  @BeforeInsert()
  generateCodigo() {
    this.codigo = `BUD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }
}
