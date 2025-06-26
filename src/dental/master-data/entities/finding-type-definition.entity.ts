import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { CariesDetailDefinition } from './caries-detail-definition.entity'; // Importa CariesDetailDefinition

@Entity('finding_type_definitions')
export class FindingTypeDefinition extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty()
  @Column({ nullable: true, length: 255 })
  description: string;

  @ApiProperty()
  @Column({ nullable: true, length: 50 })
  type: string;

  @ApiProperty()
  @Column({ nullable: true, length: 7 })
  color: string;

  @ApiProperty()
  @Column({ nullable: true, length: 10 })
  abreviatura: string;

  @ApiProperty({ type: () => CariesDetailDefinition, nullable: true })
  @ManyToOne(() => CariesDetailDefinition, { eager: false, nullable: true })
  @JoinColumn({
    name: 'id_caries_detail_definition',
    referencedColumnName: 'uuid',
  })
  cariesDetailDefinition: CariesDetailDefinition;
}
