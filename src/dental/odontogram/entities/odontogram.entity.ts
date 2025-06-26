import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('odontograms')
export class Odontogram extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'patient_uuid' })
  patientUuid: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  status: string;
}
