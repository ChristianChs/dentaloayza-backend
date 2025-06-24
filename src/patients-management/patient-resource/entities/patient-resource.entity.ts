import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Specialist } from '../../../staff/specialist/entities/specialist.entity';

@Entity('pacienterecurso')
export class PatientResource {
  @PrimaryGeneratedColumn('uuid')
  idPacienteRecurso: string;

  @Column({ type: 'uuid' })
  idPaciente: string;

  @Column({ type: 'uuid', nullable: true })
  idSpecialist: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  mime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  directorio: string;

  @ManyToOne(() => Patient, (patient) => patient.patientResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ManyToOne(() => Specialist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idSpecialist', referencedColumnName: 'uuid' })
  specialist: Specialist;
}
