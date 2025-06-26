import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Odontogram } from '../entities/odontogram.entity';
import { OdontogramDetailedOutputDto } from './dto/odontogram-view.dto';

import { OdontogramFinding } from '../../odontogram-finding/entities/odontogram-finding.entity';
import { FindingTypeDefinition } from '../../master-data/entities/finding-type-definition.entity'; // CORRECTED PATH
import { DentalSurfaceTypeDefinition } from '../../master-data/entities/dental-surface-type-definition.entity'; // CORRECTED PATH
import { OdontogramFindingSurface } from '../../odontogram-finding-surface/entities/odontogram-finding-surface.entity';
import { OdontogramFindingServiceEntity } from '../../odontogram-finding-service/entities/odontogram-finding-service.entity'; // CORRECTED NAME AND PATH
import { DentalTreatment } from '../../dental-treatment/entities/dental-treatment.entity';

@Injectable()
export class OdontogramViewService {
  constructor(
    @InjectRepository(Odontogram)
    private readonly odontogramRepository: Repository<Odontogram>,
    @InjectRepository(OdontogramFinding)
    private readonly odontogramFindingRepository: Repository<OdontogramFinding>,
    @InjectRepository(FindingTypeDefinition)
    private readonly findingTypeDefinitionRepository: Repository<FindingTypeDefinition>,
    @InjectRepository(DentalSurfaceTypeDefinition)
    private readonly dentalSurfaceTypeDefinitionRepository: Repository<DentalSurfaceTypeDefinition>,
    @InjectRepository(OdontogramFindingSurface)
    private readonly odontogramFindingSurfaceRepository: Repository<OdontogramFindingSurface>,
    @InjectRepository(OdontogramFindingServiceEntity) // Use the correct entity name
    private readonly odontogramFindingServiceEntityRepository: Repository<OdontogramFindingServiceEntity>,
    @InjectRepository(DentalTreatment)
    private readonly dentalTreatmentRepository: Repository<DentalTreatment>,
  ) {}

  async getDetailedOdontogramForPatient(
    idPaciente: string,
  ): Promise<OdontogramDetailedOutputDto[]> {
    const odontogram = await this.odontogramRepository
      .createQueryBuilder('odontogram')
      .leftJoinAndSelect('odontogram.patient', 'patient')
      .leftJoinAndSelect('odontogram.odontogramFindings', 'finding')
      .leftJoinAndSelect('finding.findingTypeDefinition', 'findingType')
      .leftJoinAndSelect('finding.odontogramFindingSurfaces', 'surface')
      .leftJoinAndSelect('surface.dentalSurfaceTypeDefinition', 'surfaceType')
      .leftJoinAndSelect('finding.odontogramFindingServices', 'service')
      .leftJoinAndSelect('service.dentalTreatment', 'treatment')
      .where('odontogram.idPaciente = :idPaciente', { idPaciente })
      .andWhere('odontogram.isActive = :isActive', { isActive: true })
      .getOne();

    if (!odontogram) {
      throw new NotFoundException(
        `Odontograma no encontrado para el paciente con ID: ${idPaciente}`,
      );
    }

    const result: OdontogramDetailedOutputDto[] = [];
    const groupedByTooth: Map<
      number,
      { finding?: any; notes: string; services: any[]; rawFindings: any[] }
    > = new Map();

    if (
      odontogram.odontogramFindings &&
      odontogram.odontogramFindings.length > 0
    ) {
      for (const finding of odontogram.odontogramFindings) {
        const toothNum = finding.toothNumber;

        if (!groupedByTooth.has(toothNum)) {
          groupedByTooth.set(toothNum, {
            notes: '',
            services: [],
            rawFindings: [],
          });
        }
        const toothData = groupedByTooth.get(toothNum);
        toothData.rawFindings.push(finding);

        if (!toothData.finding) {
          toothData.finding = {
            tipo: finding.findingTypeDefinition?.type || '',
            nombre: finding.findingTypeDefinition?.name || '',
            color: finding.findingTypeDefinition?.color || '#000000',
            abreviatura: finding.findingTypeDefinition?.abreviatura || '',
            detalle: finding.findingTypeDefinition?.cariesDetailDefinition
              ? [
                  {
                    abreviatura:
                      finding.findingTypeDefinition.cariesDetailDefinition
                        .abreviatura,
                    nombre:
                      finding.findingTypeDefinition.cariesDetailDefinition.name,
                  },
                ]
              : [],
            direccion: finding.direction,
            cara: this.mapFindingSurfacesToCara(
              finding.odontogramFindingSurfaces,
            ),
          };
        }

        if (finding.notes) {
          toothData.notes += (toothData.notes ? '; ' : '') + finding.notes;
        }

        if (finding.odontogramFindingServices) {
          for (const service of finding.odontogramFindingServices) {
            toothData.services.push({
              tipo: service.dentalTreatment?.type || 'Tratamiento',
              nombre: service.dentalTreatment?.name || '',
              precio: service.dentalTreatment?.price || 0,
            });
          }
        }
      }
    }

    for (const [toothNum, data] of groupedByTooth.entries()) {
      result.push({
        diente: toothNum,
        hallazgo: data.finding,
        nota: data.notes,
        servicios: data.services,
      });
    }

    return result;
  }

  private mapFindingSurfacesToCara(surfaces: any[]): { [key: string]: any } {
    const caraMap: { [key: string]: any } = {};
    if (surfaces) {
      for (const s of surfaces) {
        const abbreviation =
          s.dentalSurfaceTypeDefinition?.abbreviation || 'DESCONOCIDO';
        caraMap[abbreviation] = {
          tipo: s.dentalSurfaceTypeDefinition?.type || '',
          abreviatura: abbreviation,
          nombre: s.dentalSurfaceTypeDefinition?.name || '',
          color: s.dentalSurfaceTypeDefinition?.color || '#000000',
          detalle: s.cariesDetail
            ? {
                abreviatura: s.cariesDetail.abbreviation,
                nombre: s.cariesDetail.name,
              }
            : undefined,
        };
      }
    }
    return caraMap;
  }
}
