import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AntecedentPatient } from './entities/antecedent-patient.entity';
import { CreateFullAntecedentPatientDto } from './dto/create-antecedent-patient.dto';
import { Patient } from '../patient/entities/patient.entity';

@Injectable()
export class AntecedentPatientService {
  constructor(
    @InjectRepository(AntecedentPatient)
    private antecedentPatientRepository: Repository<AntecedentPatient>,

    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(
    dto: CreateFullAntecedentPatientDto,
  ): Promise<AntecedentPatient> {
    const patient = await this.patientRepository.findOneBy({
      idPaciente: dto.idPaciente,
    });

    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${dto.idPaciente} no encontrado`,
      );
    }

    const entity = this.antecedentPatientRepository.create(dto);
    entity.patient = patient;

    return this.antecedentPatientRepository.save(entity);
  }

  async findAll(): Promise<AntecedentPatient[]> {
    return this.antecedentPatientRepository.find({
      relations: ['patient'],
    });
  }

  async findByPaciente(idPaciente: string): Promise<AntecedentPatient> {
    const antecedente = await this.antecedentPatientRepository.findOne({
      where: { idPaciente },
      relations: ['patient'],
    });

    if (!antecedente) {
      throw new NotFoundException(
        `No se encontraron antecedentes para el paciente ${idPaciente}`,
      );
    }

    return antecedente;
  }

  async findOne(id: string): Promise<AntecedentPatient> {
    const antecedente = await this.antecedentPatientRepository.findOne({
      where: { idAntecedentePaciente: id },
      relations: ['patient'],
    });

    if (!antecedente) {
      throw new NotFoundException(`Antecedente con ID ${id} no encontrado`);
    }

    return antecedente;
  }

  async update(
    id: string,
    dto: Partial<CreateFullAntecedentPatientDto>,
  ): Promise<AntecedentPatient> {
    const antecedente = await this.findOne(id);
    this.antecedentPatientRepository.merge(antecedente, dto);
    return this.antecedentPatientRepository.save(antecedente);
  }

  async remove(id: string): Promise<void> {
    const result = await this.antecedentPatientRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Antecedente con ID ${id} no encontrado`);
    }
  }
}
