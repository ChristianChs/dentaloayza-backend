import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('finding_type_definitions')
export class FindingTypeDefinition extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty()
  @Column({ nullable: true, length: 255 })
  description: string;
}
