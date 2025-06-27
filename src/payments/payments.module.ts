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
@Module({
  controllers: [BudgetController, BudgetItemController, PaymentController],
  providers: [BudgetService, BudgetItemService, PaymentService],
  imports: [
    TypeOrmModule.forFeature([Budget, BudgetItem, Payment]),
    RouterModule.register([
      {
        path: 'payments',
        module: PaymentsModule,
      },
    ]),
    StaffModule,
  ],
})
export class PaymentsModule {}
