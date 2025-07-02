import { BaseEntity } from 'src/common/entities/base.entity';
import { PaymentItem } from 'src/payments/payment-item/entities/payment-item.entity';
import { Specialist } from 'src/staff/specialist/entities/specialist.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MetodoPago, TipoComprobante } from '../enum';
import { Patient } from 'src/patients-management/patient/entities/patient.entity';

@Entity()
export class Payment extends BaseEntity {
  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  concepto: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  monto: number;

  @Column('enum', {
    enum: TipoComprobante,
    nullable: false,
  })
  comprobante: TipoComprobante;

  @Column('enum', {
    enum: MetodoPago,
    name: 'metodo_pago',
    nullable: false,
  })
  metodoPago: MetodoPago;

  @ManyToOne(() => Specialist, { nullable: false })
  @JoinColumn({ name: 'id_especialista' })
  especialista: Specialist;

  @ManyToOne(() => Patient, (patient) => patient.payments, { nullable: false })
  @JoinColumn({ name: 'id_paciente', referencedColumnName: 'idPaciente' })
  paciente: Patient;

  @OneToMany(() => PaymentItem, (item) => item.pago, { nullable: false })
  items: PaymentItem[];
}
