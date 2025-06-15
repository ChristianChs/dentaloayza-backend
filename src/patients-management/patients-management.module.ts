import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Patient } from './patient/entities/patient.entity';
import { PatientResource } from './patient-resource/entities/patient-resource.entity';
import { AntecedentPatient } from './antecedent-patient/entities/antecedent-patient.entity';
import { AntecedentDetail } from './antecedent-detail/entities/antecedent-detail.entity';
import { Appointment } from './appointment/entities/appointment.entity';
import { PatientTag } from './patient-tag/entities/patient/patient-tag.entity';

import { PatientController } from './patient/patient.controller';
import { PatientResourceController } from './patient-resource/patient-resource.controller';
import { AntecedentPatientController } from './antecedent-patient/antecedent-patient.controller';
import { AntecedentDetailController } from './antecedent-detail/antecedent-detail.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { PatientTagController } from './patient-tag/patient-tag.controller';

import { PatientService } from './patient/patient.service';
import { PatientResourceService } from './patient-resource/patient-resource.service';
import { AntecedentPatientService } from './antecedent-patient/antecedent-patient.service';
import { AntecedentDetailService } from './antecedent-detail/antecedent-detail.service';
import { AppointmentService } from './appointment/appointment.service';
import { PatientTagService } from './patient-tag/patient-tag.service';

import { Person } from '../staff/person/entities/person.entity';
import { Specialist } from '../staff/specialist/entities/specialist.entity';
import { Antecedent } from '../catalog/antecedent/entities/antecedent.entity';
import { AppointmentReason } from '../catalog/appointment-reason/entities/appointment-reason.entity';
import { Tag } from '../catalog/tag/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      PatientResource,
      AntecedentPatient,
      AntecedentDetail,
      Appointment,
      PatientTag,
      Person,
      Specialist,
      Antecedent,
      AppointmentReason,
      Tag,
    ]),
  ],
  controllers: [
    PatientController,
    PatientResourceController,
    AntecedentPatientController,
    AntecedentDetailController,
    AppointmentController,
    PatientTagController,
  ],
  providers: [
    PatientService,
    PatientResourceService,
    AntecedentPatientService,
    AntecedentDetailService,
    AppointmentService,
    PatientTagService,
  ],
  exports: [
    TypeOrmModule.forFeature([
      Patient,
      PatientResource,
      AntecedentPatient,
      AntecedentDetail,
      Appointment,
      PatientTag,
    ]),
    PatientService,
    PatientResourceService,
    AntecedentPatientService,
    AntecedentDetailService,
    AppointmentService,
    PatientTagService,
  ],
})
export class PatientsManagementModule {}
