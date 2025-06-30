import { BaseEntity } from 'src/common/entities/base.entity';
import { BudgetItem } from 'src/payments/budget-item/entities/budget-item.entity';
import { Payment } from 'src/payments/payment/entities/payment.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class PaymentItem extends BaseEntity {
  @ManyToOne(() => Payment, (payment) => payment.items)
  @JoinColumn({ name: 'id_pago' })
  pago: Payment;

  @ManyToOne(() => BudgetItem, (budgetItem) => budgetItem.pagoItems)
  @JoinColumn({ name: 'id_presupuesto_item' })
  presupuestoItem: BudgetItem;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  montoAbonado: number;
}
