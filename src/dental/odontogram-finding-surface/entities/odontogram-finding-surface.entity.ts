import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { OdontogramFinding } from '../../odontogram-finding/entities/odontogram-finding.entity';
import { DentalSurfaceTypeDefinition } from '../../master-data/entities/dental-surface-type-definition.entity';

@Entity('odontogram_finding_surfaces')
export class OdontogramFindingSurface extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'odontogram_finding_uuid' })
  odontogramFindingUuid: string;

  @ApiProperty()
  @Column({ name: 'dental_surface_type_definition_uuid' })
  dentalSurfaceTypeDefinitionUuid: string;

  @ManyToOne(() => OdontogramFinding)
  @JoinColumn({ name: 'odontogram_finding_uuid', referencedColumnName: 'uuid' })
  odontogramFinding: OdontogramFinding;

  @ManyToOne(() => DentalSurfaceTypeDefinition)
  @JoinColumn({
    name: 'dental_surface_type_definition_uuid',
    referencedColumnName: 'uuid',
  })
  dentalSurfaceTypeDefinition: DentalSurfaceTypeDefinition;
}
