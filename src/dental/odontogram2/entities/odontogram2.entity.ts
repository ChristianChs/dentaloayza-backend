import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from '../../../patients-management/patient/entities/patient.entity';

export enum OdontogramType {
  PERMANENTE = 'Permanente',
  PRIMARIA = 'Primaria',
}

@Entity('odontograma2')
export class Odontogram2 {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.odontogramas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column('json')
  data: any;

  @Column({
    type: 'enum',
    enum: OdontogramType,
  })
  type: OdontogramType;

  @CreateDateColumn()
  createdAt: Date;
}
