import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Person } from '../../../staff/person/entities/person.entity';
import { PatientResource } from '../../patient-resource/entities/patient-resource.entity';
import { AntecedentPatient } from '../../antecedent-patient/entities/antecedent-patient.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { PatientTag } from '../../patient-tag/entities/patient-tag.entity';
import { PatientPaymentStatus } from '../../enums/patient-payment-status.enum';

@Entity('paciente')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  idPaciente: string;

  @Column({ type: 'uuid' })
  idPersona: string;

  @Column({
    type: 'enum',
    enum: PatientPaymentStatus,
    default: PatientPaymentStatus.PENDIENTE,
  })
  estadoPago: PatientPaymentStatus;

  @OneToOne(() => Person, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPersona', referencedColumnName: 'idPersona' })
  persona: Person;

  @OneToMany(
    () => PatientResource,
    (patientResource) => patientResource.patient,
  )
  patientResources: PatientResource[];

  @OneToMany(
    () => AntecedentPatient,
    (antecedentPatient) => antecedentPatient.patient,
  )
  antecedentPatients: AntecedentPatient[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => PatientTag, (patientTag) => patientTag.patient)
  patientTags: PatientTag[];
}
