import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('dental_surface_type_definitions')
export class DentalSurfaceTypeDefinition extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true, length: 50 })
  name: string;

  @ApiProperty()
  @Column({ nullable: true, length: 255 })
  description: string;
}
