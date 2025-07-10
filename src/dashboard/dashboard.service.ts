import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../patients-management/appointment/entities/appointment.entity';
import { Patient } from '../patients-management/patient/entities/patient.entity';
import { Payment } from '../payments/payment/entities/payment.entity';
import { Budget } from '../payments/budget/entities/budget.entity';
import { Repository, Between, Like } from 'typeorm';
import { PatientStatus } from '../patients-management/enums/patient-payment-status.enum';
@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(Budget)
    private budgetRepo: Repository<Budget>,
  ) {}

  async getDashboardData() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    // const today = new Date().toISOString().split('T')[0]; // "2025-07-06"
    // const todayStart = `${today} 00:00:00`;
    // const todayEnd = `${today} 23:59:59`;

    const peruDate = new Date(now.getTime() - 5 * 60 * 60 * 1000);
    const today = peruDate.toISOString().split('T')[0];

    const citasHoy = await this.appointmentRepo.count({
      where: {
        fechaCita: Like(`${today}%`),
      },
    });

    const pacientesActivos = await this.patientRepo.count({
      where: { estado: PatientStatus.ACTIVO },
    });

    const pagosMes = await this.paymentRepo.find({
      where: {
        createdAt: Between(monthStart, monthEnd),
      },
    });
    const ingresosMes = pagosMes.reduce(
      (sum, p) => sum + Number(p.monto || 0),
      0,
    );

    const presupuestosPendientes = await this.budgetRepo.count({
      where: { estado: 'CREADO' },
    });

    const actividades = await this.getActividadesRecientes();

    return {
      citasHoy,
      pacientesActivos,
      ingresosMes,
      presupuestosPendientes,
      actividades,
    };
  }

  private async getActividadesRecientes() {
    const actividades: any[] = [];

    const ultimasCitas = await this.appointmentRepo.find({
      order: { fechaCita: 'DESC' },
      take: 5,
      relations: ['patient'],
    });

    ultimasCitas.forEach((cita) => {
      actividades.push({
        tipo: 'Cita',
        estado: cita.estadoCita,
        patient: cita.patient?.persona?.nombre || '',
        fecha: cita.fechaCita,
      });
    });

    const ultimosPagos = await this.paymentRepo.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['paciente'],
    });

    ultimosPagos.forEach((pago) => {
      actividades.push({
        tipo: 'Pago',
        paciente: pago.paciente?.persona?.nombre || '',
        monto: pago.monto,
        fecha: pago.createdAt,
      });
    });

    const nuevosPacientes = await this.patientRepo.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['persona'],
    });

    nuevosPacientes.forEach((p) => {
      actividades.push({
        tipo: 'Paciente',
        paciente: p.persona?.nombre || '',
        fecha: p.createdAt,
      });
    });

    return actividades.sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
    );
  }
}
