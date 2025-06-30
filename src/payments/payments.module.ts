import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BudgetController } from './budget/budget.controller';
import { BudgetItemController } from './budget-item/budget-item.controller';
import { PaymentController } from './payment/payment.controller';

import { BudgetService } from './budget/budget.service';
import { PaymentService } from './payment/payment.service';
import { BudgetItemService } from './budget-item/budget-item.service';

import { Budget } from './budget/entities/budget.entity';
import { BudgetItem } from './budget-item/entities/budget-item.entity';
import { Payment } from './payment/entities/payment.entity';
import { StaffModule } from 'src/staff/staff.module';
import { ProceduresModule } from 'src/procedures/procedures.module';
import { PaymentItem } from './payment-item/entities/payment-item.entity';
import { PaymentItemController } from './payment-item/payment-item.controller';
import { PaymentItemService } from './payment-item/payment-item.service';

@Module({
  controllers: [
    BudgetController,
    BudgetItemController,
    PaymentController,
    PaymentItemController,
  ],
  providers: [
    BudgetService,
    BudgetItemService,
    PaymentService,
    PaymentItemService,
  ],
  imports: [
    TypeOrmModule.forFeature([Budget, BudgetItem, Payment, PaymentItem]),
    RouterModule.register([
      {
        path: 'payments',
        module: PaymentsModule,
      },
    ]),
    StaffModule,
    ProceduresModule,
  ],
})
export class PaymentsModule {}
