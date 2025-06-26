import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/entities/patient.entity';
import { Antecedente } from '../../../catalog/antecedent/entities/antecedent.entity';
import { AntecedentDetail } from '../../antecedent-detail/entities/antecedent-detail.entity';

@Entity('antecedentepaciente')
export class AntecedentPatient {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  idAntecedentePaciente: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idPaciente: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idAntecedente: string;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(() => Patient, (patient) => patient.antecedentPatients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ApiProperty({ type: () => Antecedente })
  @ManyToOne(() => Antecedente, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idAntecedente', referencedColumnName: 'uuid' })
  antecedent: Antecedente;

  @ApiProperty({ type: () => [AntecedentDetail] })
  @OneToMany(
    () => AntecedentDetail,
    (antecedentDetail) => antecedentDetail.antecedentPatient,
  )
  antecedentDetails: AntecedentDetail[];
}
