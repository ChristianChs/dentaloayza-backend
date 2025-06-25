import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import Antecedente components
import { Antecedente } from './antecedent/entities/antecedent.entity';
import { AntecedenteService } from './antecedent/antecedent.service';
import { AntecedenteController } from './antecedent/antecedent.controller';

// Import MotivoCita components
import { MotivoCita } from './appointment-reason/entities/appointment-reason.entity';
import { MotivoCitaService } from './appointment-reason/appointment-reason.service';
import { MotivoCitaController } from './appointment-reason/appointment-reason.controller';

// Import Etiqueta components
import { Etiqueta } from './tag/entities/tag.entity';
import { EtiquetaService } from './tag/tag.service';
import { EtiquetaController } from './tag/tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Antecedente, MotivoCita, Etiqueta])],
  controllers: [
    AntecedenteController,
    MotivoCitaController,
    EtiquetaController,
  ],
  providers: [AntecedenteService, MotivoCitaService, EtiquetaService],
  exports: [
    AntecedenteService,
    MotivoCitaService,
    EtiquetaService,
    TypeOrmModule,
  ],
})
export class CatalogModule {}
