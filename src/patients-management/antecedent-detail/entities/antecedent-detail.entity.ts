import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AntecedentPatient } from '../../antecedent-patient/entities/antecedent-patient.entity';

@Entity('antecedentedetalle')
export class AntecedentDetail {
  @ApiProperty({
    description: 'ID único del detalle del antecedente',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  idAntecedenteDetalle: string;

  @ApiProperty({
    description:
      'ID del antecedente del paciente al que pertenece este detalle',
    format: 'uuid',
  })
  @Column({ type: 'uuid' })
  idAntecedentePaciente: string;

  @ApiProperty({
    description: 'Descripción del detalle del antecedente',
    example: 'Alergia a la penicilina',
    nullable: true,
    maxLength: 255,
  })
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
