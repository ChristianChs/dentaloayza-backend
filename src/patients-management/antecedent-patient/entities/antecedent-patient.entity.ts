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

  // Ejemplo de campos para tus preguntas (ajusta según tu formulario)

  @Column({ type: 'varchar', length: 10, nullable: true })
  q1_fuma: string; // "Sí" o "No"

  @Column({ type: 'varchar', length: 10, nullable: true })
  q2_bebeAlcohol: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  q3_alergico: string;

  @Column({ type: 'text', nullable: true })
  q3_cuales: string; // Detalle de alergias

  @Column({ type: 'varchar', length: 10, nullable: true })
  q4_embarazada: string;

  @Column('simple-array', { nullable: true })
  q5_enfermedades: string[];

  @Column({ type: 'text', nullable: true })
  q6_medicamentos: string;

  @Column({ type: 'text', nullable: true })
  q7_intervenciones: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  q8_sangrado: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  q9_diabetes: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  q10_hipertension: string;

  @Column({ type: 'text', nullable: true })
  q11_otro: string;

  @CreateDateColumn()
  createdAt: Date;
}
