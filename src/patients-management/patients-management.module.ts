import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// ENTIDADES PROPIAS DEL MÓDULO PATIENTS-MANAGEMENT
import { Patient } from './patient/entities/patient.entity';
import { PatientResource } from './patient-resource/entities/patient-resource.entity';
import { AntecedentPatient } from './antecedent-patient/entities/antecedent-patient.entity';
import { AntecedentDetail } from './antecedent-detail/entities/antecedent-detail.entity';
import { Appointment } from './appointment/entities/appointment.entity';
import { PatientTag } from './patient-tag/entities/patient-tag.entity';

// CONTROLADORES PROPIOS DEL MÓDULO PATIENTS-MANAGEMENT
import { PatientController } from './patient/patient.controller';
import { PatientResourceController } from './patient-resource/patient-resource.controller';
import { AntecedentPatientController } from './antecedent-patient/antecedent-patient.controller';
import { AntecedentDetailController } from './antecedent-detail/antecedent-detail.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { PatientTagController } from './patient-tag/patient-tag.controller';

// SERVICIOS PROPIOS DEL MÓDULO PATIENTS-MANAGEMENT
import { PatientService } from './patient/patient.service';
import { PatientResourceService } from './patient-resource/patient-resource.service';
import { AntecedentPatientService } from './antecedent-patient/antecedent-patient.service';
import { AntecedentDetailService } from './antecedent-detail/antecedent-detail.service';
import { AppointmentService } from './appointment/appointment.service';
import { PatientTagService } from './patient-tag/patient-tag.service';

// IMPORTA LOS MÓDULOS DE LOS CUALES DEPENDES (PARA OBTENER SERVICIOS/ENTIDADES EXPORTADAS)
import { StaffModule } from '../staff/staff.module'; // <-- ¡Añade esto!
import { CatalogModule } from '../catalog/catalog.module'; // <-- ¡Añade esto!
import { ProceduresModule } from 'src/procedures/procedures.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // SOLO ENTIDADES QUE PERTENECEN Y SON GESTIONADAS PRIMORDIALMENTE POR ESTE MÓDULO
      Patient,
      PatientResource,
      AntecedentPatient,
      AntecedentDetail,
      Appointment,
      PatientTag,
    ]),
    StaffModule, // <-- ¡Importa StaffModule para acceder a PersonService!
    CatalogModule, // <-- ¡Importa CatalogModule para acceder a Antecedente, MotivoCita, Etiqueta y sus servicios!
    ProceduresModule,
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
