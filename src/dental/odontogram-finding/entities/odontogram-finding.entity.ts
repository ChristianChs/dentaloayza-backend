import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Odontogram } from '../../odontogram/entities/odontogram.entity';
import { FindingTypeDefinition } from '../../master-data/entities/finding-type-definition.entity';
import { OdontogramFindingSurface } from '../../odontogram-finding-surface/entities/odontogram-finding-surface.entity';
import { OdontogramFindingServiceEntity } from '../../odontogram-finding-service/entities/odontogram-finding-service.entity';

@Entity('odontogram_findings')
export class OdontogramFinding extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'odontogram_uuid' })
  odontogramUuid: string;

  @ApiProperty()
  @Column('int')
  toothNumber: number;

  @ApiProperty()
  @Column({ name: 'finding_type_definition_uuid' })
  findingTypeDefinitionUuid: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty()
  @Column({ nullable: true }) // Nueva propiedad para la dirección (ej. "izquierda", "derecha")
  direction: string;

  @ManyToOne(() => Odontogram, (odontogram) => odontogram.odontogramFindings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'odontogram_uuid', referencedColumnName: 'uuid' })
  odontogram: Odontogram;

  @ManyToOne(() => FindingTypeDefinition, {
    eager: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'finding_type_definition_uuid',
    referencedColumnName: 'uuid',
  })
  findingTypeDefinition: FindingTypeDefinition;

  @OneToMany(
    () => OdontogramFindingSurface,
    (odontogramFindingSurface) => odontogramFindingSurface.odontogramFinding,
    { cascade: true, eager: false },
  )
  odontogramFindingSurfaces: OdontogramFindingSurface[];

  @OneToMany(
    () => OdontogramFindingServiceEntity,
    (odontogramFindingService) => odontogramFindingService.odontogramFinding,
    { cascade: true, eager: false },
  )
  odontogramFindingServices: OdontogramFindingServiceEntity[];
}
