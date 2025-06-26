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
import { MotivoCita } from '../../../catalog/appointment-reason/entities/appointment-reason.entity';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

@Entity('cita')
export class Appointment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  idCita: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idPaciente: string;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  idSpecialist: string;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true })
  idMotivoCita: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  fechaCita: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  horaInicio: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  horaFin: string;

  @ApiProperty({ enum: AppointmentStatus })
  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDIENTE,
  })
  estadoCita: AppointmentStatus;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ApiProperty({ type: () => Specialist })
  @ManyToOne(() => Specialist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idSpecialist', referencedColumnName: 'uuid' })
  specialist: Specialist;

  @ApiProperty({ type: () => MotivoCita })
  @ManyToOne(() => MotivoCita, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idMotivoCita', referencedColumnName: 'uuid' })
  appointmentReason: MotivoCita;
}
