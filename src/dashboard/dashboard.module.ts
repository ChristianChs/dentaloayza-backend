import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

import { Appointment } from '../patients-management/appointment/entities/appointment.entity';
import { Patient } from '../patients-management/patient/entities/patient.entity';
import { Payment } from '../payments/payment/entities/payment.entity';
import { Budget } from '../payments/budget/entities/budget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Payment, Budget])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
