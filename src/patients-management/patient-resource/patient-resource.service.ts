import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientResource } from './entities/patient-resource.entity';
import { CreatePatientResourceDto } from './dto/create-patient-resource.dto';
import { UpdatePatientResourceDto } from './dto/update-patient-resource.dto';
import { Patient } from '../patient/entities/patient.entity';
import { Specialist } from '../../staff/specialist/entities/specialist.entity';

@Injectable()
export class PatientResourceService {
  constructor(
    @InjectRepository(PatientResource)
    private patientResourceRepository: Repository<PatientResource>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Specialist)
    private specialistRepository: Repository<Specialist>,
  ) {}

  async create(
    createPatientResourceDto: CreatePatientResourceDto,
  ): Promise<PatientResource> {
    const patient = await this.patientRepository.findOneBy({
      idPaciente: createPatientResourceDto.idPaciente,
    });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${createPatientResourceDto.idPaciente} no encontrado`,
      );
    }

    const specialist = await this.specialistRepository.findOneBy({
      uuid: createPatientResourceDto.idSpecialist,
    });
    if (!specialist) {
      throw new NotFoundException(
        `Especialista con ID ${createPatientResourceDto.idSpecialist} no encontrado`,
      );
    }
    if (!specialist) {
      throw new NotFoundException(
        `Especialista con ID ${createPatientResourceDto.idSpecialist} no encontrado`,
      );
    }

    const newPatientResource = this.patientResourceRepository.create(
      createPatientResourceDto,
    );
    return await this.patientResourceRepository.save(newPatientResource);
  }

  async findAll(): Promise<PatientResource[]> {
    return await this.patientResourceRepository.find({
      relations: ['patient', 'specialist'],
    });
  }

  async findOne(id: string): Promise<PatientResource> {
    const patientResource = await this.patientResourceRepository.findOne({
      where: { idPacienteRecurso: id },
      relations: ['patient', 'specialist'],
    });
    if (!patientResource) {
      throw new NotFoundException(
        `Recurso de paciente con ID ${id} no encontrado`,
      );
    }
    return patientResource;
  }

  async update(
    id: string,
    updatePatientResourceDto: UpdatePatientResourceDto,
  ): Promise<PatientResource> {
    const patientResource = await this.findOne(id);
    this.patientResourceRepository.merge(
      patientResource,
      updatePatientResourceDto,
    );
    return await this.patientResourceRepository.save(patientResource);
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientResourceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Recurso de paciente con ID ${id} no encontrado`,
      );
    }
  }
}
