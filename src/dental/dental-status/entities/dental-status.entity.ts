import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { DentalStatusType } from '../../enums/dental-status-type.enum';

@Entity('dental_status')
export class DentalStatus extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true, length: 100 })
  name: string;

  @ApiProperty()
  @Column({ nullable: true, length: 255 })
  description: string;

  @ApiProperty({ enum: DentalStatusType })
  @Column('enum', { enum: DentalStatusType })
  statusType: DentalStatusType;
}
