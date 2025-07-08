import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DentalStatus } from './dental-status/entities/dental-status.entity';
import { DentalStatusService } from './dental-status/dental-status.service';
import { DentalStatusController } from './dental-status/dental-status.controller';

import { DentalTreatment } from './dental-treatment/entities/dental-treatment.entity';
import { DentalTreatmentService } from './dental-treatment/dental-treatment.service';
import { DentalTreatmentController } from './dental-treatment/dental-treatment.controller';

import { Odontogram } from './odontogram/entities/odontogram.entity';
import { OdontogramService } from './odontogram/odontogram.service';
import { OdontogramController } from './odontogram/odontogram.controller';

import { OdontogramFinding } from './odontogram-finding/entities/odontogram-finding.entity';
import { OdontogramFindingService } from './odontogram-finding/odontogram-finding.service';
import { OdontogramFindingController } from './odontogram-finding/odontogram-finding.controller';

import { OdontogramFindingSurface } from './odontogram-finding-surface/entities/odontogram-finding-surface.entity';
import { OdontogramFindingSurfaceService } from './odontogram-finding-surface/odontogram-finding-surface.service';
import { OdontogramFindingSurfaceController } from './odontogram-finding-surface/odontogram-finding-surface.controller';

import { OdontogramFindingServiceEntity } from './odontogram-finding-service/entities/odontogram-finding-service.entity';
import { OdontogramFindingServiceService } from './odontogram-finding-service/odontogram-finding-service.service';
import { OdontogramFindingServiceController } from './odontogram-finding-service/odontogram-finding-service.controller';

import { FindingTypeDefinition } from './master-data/entities/finding-type-definition.entity';
import { DentalSurfaceTypeDefinition } from './master-data/entities/dental-surface-type-definition.entity';
import { CariesDetailDefinition } from './master-data/entities/caries-detail-definition.entity';
import { MasterDataService } from './master-data/master-data.service';
import { MasterDataController } from './master-data/master-data.controller';

import { OdontogramViewController } from './odontogram/odontogram-view/odontogram-view.controller';
import { OdontogramViewService } from './odontogram/odontogram-view/odontogram-view.service';

import { Odontogram2 } from './odontogram2/entities/odontogram2.entity';
import { Odontogram2Service } from './odontogram2/odontogram2.service';
import { Odontogram2Controller } from './odontogram2/odontogram2.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DentalStatus,
      DentalTreatment,
      Odontogram,
      OdontogramFinding,
      OdontogramFindingSurface,
      OdontogramFindingServiceEntity,
      FindingTypeDefinition,
      DentalSurfaceTypeDefinition,
      CariesDetailDefinition,
      Odontogram2,
    ]),
  ],
  controllers: [
    DentalStatusController,
    DentalTreatmentController,
    OdontogramController,
    OdontogramFindingController,
    OdontogramFindingSurfaceController,
    OdontogramFindingServiceController,
    MasterDataController,
    OdontogramViewController,
    Odontogram2Controller,
  ],
  providers: [
    DentalStatusService,
    DentalTreatmentService,
    OdontogramService,
    OdontogramFindingService,
    OdontogramFindingSurfaceService,
    OdontogramFindingServiceService,
    MasterDataService,
    OdontogramViewService,
    Odontogram2Service,
  ],
  exports: [
    DentalStatusService,
    DentalTreatmentService,
    OdontogramService,
    OdontogramFindingService,
    OdontogramFindingSurfaceService,
    OdontogramFindingServiceService,
    MasterDataService,
    OdontogramViewService,
    Odontogram2Service,
  ],
})
export class DentalModule {}
