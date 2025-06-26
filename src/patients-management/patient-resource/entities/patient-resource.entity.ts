import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/entities/patient.entity';
import { Specialist } from '../../../staff/specialist/entities/specialist.entity';

@Entity('pacienterecurso')
export class PatientResource {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  idPacienteRecurso: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idPaciente: string;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  idSpecialist: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45, nullable: true })
  descripcion: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45, nullable: true })
  mime: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: true })
  directorio: string;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(() => Patient, (patient) => patient.patientResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ApiProperty({ type: () => Specialist })
  @ManyToOne(() => Specialist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idSpecialist', referencedColumnName: 'uuid' })
  specialist: Specialist;
}
