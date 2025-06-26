import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { OdontogramFinding } from '../../odontogram-finding/entities/odontogram-finding.entity';
import { DentalTreatment } from '../../dental-treatment/entities/dental-treatment.entity';

@Entity('odontogram_finding_services')
export class OdontogramFindingServiceEntity extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'odontogram_finding_uuid' })
  odontogramFindingUuid: string;

  @ApiProperty()
  @Column({ name: 'dental_treatment_uuid' })
  dentalTreatmentUuid: string;

  @ManyToOne(() => OdontogramFinding)
  @JoinColumn({ name: 'odontogram_finding_uuid', referencedColumnName: 'uuid' })
  odontogramFinding: OdontogramFinding;

  @ManyToOne(() => DentalTreatment)
  @JoinColumn({ name: 'dental_treatment_uuid', referencedColumnName: 'uuid' })
  dentalTreatment: DentalTreatment;
}
