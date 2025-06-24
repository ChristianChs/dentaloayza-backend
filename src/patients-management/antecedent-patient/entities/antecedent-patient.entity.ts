import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Antecedente } from '../../../catalog/antecedent/entities/antecedent.entity';
import { AntecedentDetail } from '../../antecedent-detail/entities/antecedent-detail.entity';

@Entity('antecedentepaciente')
export class AntecedentPatient {
  @PrimaryGeneratedColumn('uuid')
  idAntecedentePaciente: string;

  @Column({ type: 'uuid' })
  idPaciente: string;

  @Column({ type: 'uuid' })
  idAntecedente: string;

  @ManyToOne(() => Patient, (patient) => patient.antecedentPatients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ManyToOne(() => Antecedente, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idAntecedente', referencedColumnName: 'uuid' })
  antecedent: Antecedente;

  @OneToMany(
    () => AntecedentDetail,
    (antecedentDetail) => antecedentDetail.antecedentPatient,
  )
  antecedentDetails: AntecedentDetail[];
}
