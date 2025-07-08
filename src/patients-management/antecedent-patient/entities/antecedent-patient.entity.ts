import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

@Entity('antecedentepaciente')
export class AntecedentPatient {
  @PrimaryGeneratedColumn('uuid')
  idAntecedentePaciente: string;

  @Column({ type: 'uuid' })
  idPaciente: string;

  @ManyToOne(() => Patient, (patient) => patient.antecedentPatients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  // Basado en BackendAntecedentesMedicos

  @Column({ type: 'varchar', length: 5 })
  q1_hospitalizado: 'Sí' | 'No';

  @Column({ type: 'text', nullable: true })
  q1_porque?: string;

  @Column({ type: 'text', nullable: true })
  q1_donde?: string;

  @Column({ type: 'varchar', length: 5 })
  q2_atencionMedica: 'Sí' | 'No';

  @Column({ type: 'text', nullable: true })
  q2_porque?: string;

  @Column({ type: 'text', nullable: true })
  q2_donde?: string;

  @Column({ type: 'varchar', length: 5 })
  q3_alergico: 'Sí' | 'No';

  @Column({ type: 'text', nullable: true })
  q3_cuales?: string;

  @Column({ type: 'varchar', length: 5 })
  q4_hemorragia: 'Sí' | 'No';

  @Column('simple-array', { nullable: true })
  q5_enfermedades: string[];

  @Column({ type: 'varchar', length: 5 })
  q6_otraEnfermedad: 'Sí' | 'No';

  @Column({ type: 'text', nullable: true })
  q6_cual?: string;

  @Column({ type: 'varchar', length: 5 })
  q7_medicacionActual: 'Sí' | 'No';

  @Column({ type: 'text', nullable: true })
  q7_cual?: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  q8_embarazada?: 'Sí' | 'No';

  @Column({ type: 'text', nullable: true })
  q8_semanas?: string;

  @Column({ type: 'varchar', length: 5 })
  q9_hipertenso: 'Sí' | 'No';

  @Column({ type: 'text', nullable: true })
  q10_ultimaConsultaDental?: string;

  @Column({ type: 'text', nullable: true })
  q11_motivoConsulta?: string;

  @CreateDateColumn()
  createdAt: Date;
}
