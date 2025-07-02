import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Person } from '../../../staff/person/entities/person.entity';
import { PatientResource } from '../../patient-resource/entities/patient-resource.entity';
import { AntecedentPatient } from '../../antecedent-patient/entities/antecedent-patient.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { PatientTag } from '../../patient-tag/entities/patient-tag.entity';
import { PatientPaymentStatus } from '../../enums/patient-payment-status.enum';
import { Budget } from 'src/payments/budget/entities/budget.entity';
import { Payment } from 'src/payments/payment/entities/payment.entity';

@Entity('paciente')
export class Patient {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  idPaciente: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idPersona: string;

  @ApiProperty({ enum: PatientPaymentStatus })
  @Column({
    type: 'enum',
    enum: PatientPaymentStatus,
    default: PatientPaymentStatus.PENDIENTE,
  })
  estadoPago: PatientPaymentStatus;

  @ApiProperty({ type: () => Person })
  @OneToOne(() => Person, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPersona', referencedColumnName: 'uuid' })
  persona: Person;

  @ApiProperty({ type: () => [PatientResource] })
  @OneToMany(
    () => PatientResource,
    (patientResource) => patientResource.patient,
  )
  patientResources: PatientResource[];

  @ApiProperty({ type: () => [AntecedentPatient] })
  @OneToMany(
    () => AntecedentPatient,
    (antecedentPatient) => antecedentPatient.patient,
  )
  antecedentPatients: AntecedentPatient[];

  @ApiProperty({ type: () => [Appointment] })
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @ApiProperty({ type: () => [PatientTag] })
  @OneToMany(() => PatientTag, (patientTag) => patientTag.patient)
  patientTags: PatientTag[];

  @OneToMany(() => Budget, (budget) => budget.paciente)
  budgets: Budget[];

  @OneToMany(() => Payment, (payment) => payment.paciente)
  payments: Payment[];
}
