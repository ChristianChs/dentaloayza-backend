import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Patient } from '../../../patients-management/patient/entities/patient.entity';
@Entity('odontograms')
export class Odontogram extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'id_paciente', length: 36, unique: false })
  idPaciente: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  status: string;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(() => Patient, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_paciente', referencedColumnName: 'idPaciente' })
  patient: Patient;
}
