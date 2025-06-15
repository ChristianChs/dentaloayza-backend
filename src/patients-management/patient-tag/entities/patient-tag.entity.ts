import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Tag } from '../../catalog/tag/entities/tag.entity';

@Entity('pacientetags')
export class PatientTag {
  @PrimaryGeneratedColumn('uuid')
  idPacienteEtiqueta: string;

  @Column({ type: 'uuid' })
  idPaciente: string;

  @Column({ type: 'uuid' })
  idEtiqueta: string;

  @ManyToOne(() => Patient, (patient) => patient.patientTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idEtiqueta', referencedColumnName: 'idEtiqueta' })
  tag: Tag;
}
