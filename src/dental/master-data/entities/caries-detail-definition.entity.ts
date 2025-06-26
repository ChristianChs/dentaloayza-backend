import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('caries_detail_definitions')
export class CariesDetailDefinition extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty()
  @Column({ nullable: true, length: 255 })
  description: string;

  @ApiProperty()
  @Column({ nullable: true, length: 10 })
  abreviatura: string;
}
