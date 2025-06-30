import { BaseEntity } from 'src/common/entities/base.entity';
import { Budget } from 'src/payments/budget/entities/budget.entity';
import { PaymentItem } from 'src/payments/payment-item/entities/payment-item.entity';
import { Procedure } from 'src/procedures/entities/procedure.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class BudgetItem extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precioUnitario: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  subtotal: number;

  @ManyToOne(() => Budget, (budget) => budget.items, { nullable: false })
  @JoinColumn({ name: 'id_presupuesto' })
  budget: Budget;

  @ManyToOne(() => Procedure, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_procedimiento' })
  procedure: Procedure;

  @OneToMany(() => PaymentItem, (item) => item.procedimiento)
  pagoItems: PaymentItem[];

  calculateSubtotal() {
    this.subtotal = this.cantidad * this.precioUnitario;
  }
  updateSubtotal() {
    this.calculateSubtotal();
  }
  @BeforeInsert()
  beforeInsert() {
    this.updateSubtotal();
  }
  @BeforeUpdate()
  beforeUpdate() {
    this.updateSubtotal();
  }
}
