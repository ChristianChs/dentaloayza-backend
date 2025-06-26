import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/entities/patient.entity';
import { Etiqueta } from '../../../catalog/tag/entities/tag.entity';

@Entity('pacientetags')
export class PatientTag {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  idPacienteEtiqueta: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idPaciente: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idEtiqueta: string;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(() => Patient, (patient) => patient.patientTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ApiProperty({ type: () => Etiqueta })
  @ManyToOne(() => Etiqueta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idEtiqueta', referencedColumnName: 'uuid' })
  tag: Etiqueta;
}
