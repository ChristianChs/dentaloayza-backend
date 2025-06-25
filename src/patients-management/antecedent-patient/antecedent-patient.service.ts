import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AntecedentPatient } from './entities/antecedent-patient.entity';
import { CreateAntecedentPatientDto } from './dto/create-antecedent-patient.dto';
import { UpdateAntecedentPatientDto } from './dto/update-antecedent-patient.dto';
import { Patient } from '../patient/entities/patient.entity';
import { Antecedente } from '../../catalog/antecedent/entities/antecedent.entity';

@Injectable()
export class AntecedentPatientService {
  constructor(
    @InjectRepository(AntecedentPatient)
    private antecedentPatientRepository: Repository<AntecedentPatient>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Antecedente)
    private antecedentRepository: Repository<Antecedente>,
  ) {}

  async create(
    createAntecedentPatientDto: CreateAntecedentPatientDto,
  ): Promise<AntecedentPatient> {
    const patient = await this.patientRepository.findOneBy({
      idPaciente: createAntecedentPatientDto.idPaciente,
    });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${createAntecedentPatientDto.idPaciente} no encontrado`,
      );
    }
    const antecedent = await this.antecedentRepository.findOneBy({
      uuid: createAntecedentPatientDto.idAntecedente, // <-- ¡CAMBIO CLAVE AQUÍ! Usa 'uuid'
    });
    if (!antecedent) {
      throw new NotFoundException(
        `Antecedente con ID ${createAntecedentPatientDto.idAntecedente} no encontrado`,
      );
    }

    const newAntecedentPatient = this.antecedentPatientRepository.create(
      createAntecedentPatientDto,
    );
    return await this.antecedentPatientRepository.save(newAntecedentPatient);
  }

  async findAll(): Promise<AntecedentPatient[]> {
    return await this.antecedentPatientRepository.find({
      relations: ['patient', 'antecedent'],
    });
  }

  async findOne(id: string): Promise<AntecedentPatient> {
    const antecedentPatient = await this.antecedentPatientRepository.findOne({
      where: { idAntecedentePaciente: id },
      relations: ['patient', 'antecedent'],
    });
    if (!antecedentPatient) {
      throw new NotFoundException(
        `Antecedente de paciente con ID ${id} no encontrado`,
      );
    }
    return antecedentPatient;
  }

  async update(
    id: string,
    updateAntecedentPatientDto: UpdateAntecedentPatientDto,
  ): Promise<AntecedentPatient> {
    const antecedentPatient = await this.findOne(id);
    this.antecedentPatientRepository.merge(
      antecedentPatient,
      updateAntecedentPatientDto,
    );
    return await this.antecedentPatientRepository.save(antecedentPatient);
  }

  async remove(id: string): Promise<void> {
    const result = await this.antecedentPatientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Antecedente de paciente con ID ${id} no encontrado`,
      );
    }
  }
}
