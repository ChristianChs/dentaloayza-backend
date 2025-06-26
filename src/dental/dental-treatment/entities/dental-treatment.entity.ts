import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('dental_treatment')
export class DentalTreatment extends BaseEntity {
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
  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  price: number;
}
