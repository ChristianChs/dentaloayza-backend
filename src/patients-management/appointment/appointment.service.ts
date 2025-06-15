import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient } from '../patient/entities/patient.entity';
import { Specialist } from '../../staff/specialist/entities/specialist.entity';
import { AppointmentReason } from '../../catalog/appointment-reason/entities/appointment-reason.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Specialist)
    private specialistRepository: Repository<Specialist>,
    @InjectRepository(AppointmentReason)
    private appointmentReasonRepository: Repository<AppointmentReason>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const patient = await this.patientRepository.findOneBy({
      idPaciente: createAppointmentDto.idPaciente,
    });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${createAppointmentDto.idPaciente} no encontrado`,
      );
    }
    const specialist = await this.specialistRepository.findOneBy({
      idSpecialist: createAppointmentDto.idSpecialist,
    });
    if (!specialist) {
      throw new NotFoundException(
        `Especialista con ID ${createAppointmentDto.idSpecialist} no encontrado`,
      );
    }
    const appointmentReason = await this.appointmentReasonRepository.findOneBy({
      idMotivoCita: createAppointmentDto.idMotivoCita,
    });
    if (!appointmentReason) {
      throw new NotFoundException(
        `Motivo de cita con ID ${createAppointmentDto.idMotivoCita} no encontrado`,
      );
    }

    const newAppointment =
      this.appointmentRepository.create(createAppointmentDto);
    return await this.appointmentRepository.save(newAppointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      relations: ['patient', 'specialist', 'appointmentReason'],
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { idCita: id },
      relations: ['patient', 'specialist', 'appointmentReason'],
    });
    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    this.appointmentRepository.merge(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
  }
}
