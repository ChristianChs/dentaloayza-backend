import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AntecedentPatient } from '../../antecedent-patient/entities/antecedent-patient.entity';

@Entity('antecedentedetalle')
export class AntecedentDetail {
  @PrimaryGeneratedColumn('uuid')
  idAntecedenteDetalle: string;

  @Column({ type: 'uuid' })
  idAntecedentePaciente: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @ManyToOne(
    () => AntecedentPatient,
    (antecedentPatient) => antecedentPatient.antecedentDetails,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'idAntecedentePaciente',
    referencedColumnName: 'idAntecedentePaciente',
  })
  antecedentPatient: AntecedentPatient;
}
