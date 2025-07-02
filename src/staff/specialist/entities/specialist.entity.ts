import { User } from 'src/auth/entities';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Budget } from 'src/payments/budget/entities/budget.entity';
import { Person } from 'src/staff/person/entities/person.entity';
import { Specialty } from 'src/staff/specialty/entities/specialty.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('especialistas')
export class Specialist extends BaseEntity {
  @Column('date', {
    name: 'fecha_ingreso',
  })
  fechaIngreso: string;

  @OneToOne(() => Person, (person) => person.especialista)
  @JoinColumn({ name: 'id_persona' })
  persona: Person;

  @ManyToOne(() => Specialty, (especialidad) => especialidad.especialistas)
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Specialty;

  @OneToOne(() => User, (user) => user.specialist)
  user?: User;

  @OneToMany(() => Budget, (budget) => budget.especialista)
  budget: Budget[];
}
