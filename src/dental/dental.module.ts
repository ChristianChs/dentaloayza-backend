import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Dental Status Imports
import { DentalStatus } from './dental-status/entities/dental-status.entity';
import { DentalStatusService } from './dental-status/dental-status.service';
import { DentalStatusController } from './dental-status/dental-status.controller';

// Dental Treatment Imports
import { DentalTreatment } from './dental-treatment/entities/dental-treatment.entity';
import { DentalTreatmentService } from './dental-treatment/dental-treatment.service';
import { DentalTreatmentController } from './dental-treatment/dental-treatment.controller';

// Odontogram Imports
import { Odontogram } from './odontogram/entities/odontogram.entity';
import { OdontogramService } from './odontogram/odontogram.service';
import { OdontogramController } from './odontogram/odontogram.controller';

// Odontogram Finding Imports
import { OdontogramFinding } from './odontogram-finding/entities/odontogram-finding.entity';
import { OdontogramFindingService } from './odontogram-finding/odontogram-finding.service';
import { OdontogramFindingController } from './odontogram-finding/odontogram-finding.controller';

// Odontogram Finding Surface Imports
import { OdontogramFindingSurface } from './odontogram-finding-surface/entities/odontogram-finding-surface.entity';
import { OdontogramFindingSurfaceService } from './odontogram-finding-surface/odontogram-finding-surface.service';
import { OdontogramFindingSurfaceController } from './odontogram-finding-surface/odontogram-finding-surface.controller';

// Odontogram Finding Service Imports
import { OdontogramFindingServiceEntity } from './odontogram-finding-service/entities/odontogram-finding-service.entity';
import { OdontogramFindingServiceService } from './odontogram-finding-service/odontogram-finding-service.service';
import { OdontogramFindingServiceController } from './odontogram-finding-service/odontogram-finding-service.controller';

// Master Data Imports
import { FindingTypeDefinition } from './master-data/entities/finding-type-definition.entity';
import { DentalSurfaceTypeDefinition } from './master-data/entities/dental-surface-type-definition.entity';
import { CariesDetailDefinition } from './master-data/entities/caries-detail-definition.entity';
import { MasterDataService } from './master-data/master-data.service';
import { MasterDataController } from './master-data/master-data.controller';

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
  ],
  providers: [
    DentalStatusService,
    DentalTreatmentService,
    OdontogramService,
    OdontogramFindingService,
    OdontogramFindingSurfaceService,
    OdontogramFindingServiceService,
    MasterDataService,
  ],
  exports: [
    DentalStatusService,
    DentalTreatmentService,
    OdontogramService,
    OdontogramFindingService,
    OdontogramFindingSurfaceService,
    OdontogramFindingServiceService,
    MasterDataService,
  ],
})
export class DentalModule {}
