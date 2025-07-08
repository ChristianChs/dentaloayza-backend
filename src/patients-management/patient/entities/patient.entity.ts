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
import { PatientStatus } from '../../enums/patient-payment-status.enum';
import { Budget } from 'src/payments/budget/entities/budget.entity';
import { Payment } from 'src/payments/payment/entities/payment.entity';
import { Odontogram2 } from 'src/dental/odontogram2/entities/odontogram2.entity';
import { BaseEntity2 } from 'src/common/entities/base2.entity';

@Entity('paciente')
export class Patient extends BaseEntity2 {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  idPaciente: string;

  @ApiProperty()
  @Column({ type: 'uuid' })
  idPersona: string;

  @ApiProperty({ enum: PatientStatus })
  @Column({
    type: 'enum',
    enum: PatientStatus,
    default: PatientStatus.ACTIVO,
  })
  estado: PatientStatus;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  nota?: string;

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

  @ApiProperty({ type: () => [Odontogram2] })
  @OneToMany(() => Odontogram2, (odontograma) => odontograma.patient)
  odontogramas: Odontogram2[];

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
