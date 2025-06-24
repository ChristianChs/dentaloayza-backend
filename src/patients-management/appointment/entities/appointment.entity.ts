import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Specialist } from '../../../staff/specialist/entities/specialist.entity';
import { MotivoCita } from '../../../catalog/appointment-reason/entities/appointment-reason.entity';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

@Entity('cita')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  idCita: string;

  @Column({ type: 'uuid' })
  idPaciente: string;

  @Column({ type: 'uuid', nullable: true })
  idSpecialist: string;

  @Column({ type: 'uuid', nullable: true })
  idMotivoCita: string;

  @Column({ type: 'varchar', length: 45 })
  fechaCita: string;

  @Column({ type: 'varchar', length: 45 })
  horaInicio: string;

  @Column({ type: 'varchar', length: 45 })
  horaFin: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDIENTE,
  })
  estadoCita: AppointmentStatus;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPaciente', referencedColumnName: 'idPaciente' })
  patient: Patient;

  @ManyToOne(() => Specialist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idSpecialist', referencedColumnName: 'uuid' })
  specialist: Specialist;

  @ManyToOne(() => MotivoCita, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'idMotivoCita', referencedColumnName: 'uuid' })
  appointmentReason: MotivoCita;
}
