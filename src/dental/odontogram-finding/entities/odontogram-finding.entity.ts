import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Odontogram } from '../../odontogram/entities/odontogram.entity';
import { FindingTypeDefinition } from '../../master-data/entities/finding-type-definition.entity';

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

  @ManyToOne(() => Odontogram)
  @JoinColumn({ name: 'odontogram_uuid', referencedColumnName: 'uuid' })
  odontogram: Odontogram;

  @ManyToOne(() => FindingTypeDefinition)
  @JoinColumn({
    name: 'finding_type_definition_uuid',
    referencedColumnName: 'uuid',
  })
  findingTypeDefinition: FindingTypeDefinition;
}
