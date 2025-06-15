import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientTag } from './entities/patient-tag.entity';
import { CreatePatientTagDto } from './dto/create-patient-tag.dto';
import { UpdatePatientTagDto } from './dto/update-patient-tag.dto';
import { Patient } from '../patient/entities/patient.entity';
import { Tag } from '../../catalog/tag/entities/tag.entity';

@Injectable()
export class PatientTagService {
  constructor(
    @InjectRepository(PatientTag)
    private patientTagRepository: Repository<PatientTag>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createPatientTagDto: CreatePatientTagDto): Promise<PatientTag> {
    const patient = await this.patientRepository.findOneBy({
      idPaciente: createPatientTagDto.idPaciente,
    });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${createPatientTagDto.idPaciente} no encontrado`,
      );
    }
    const tag = await this.tagRepository.findOneBy({
      idEtiqueta: createPatientTagDto.idEtiqueta,
    });
    if (!tag) {
      throw new NotFoundException(
        `Etiqueta con ID ${createPatientTagDto.idEtiqueta} no encontrada`,
      );
    }

    const newPatientTag = this.patientTagRepository.create(createPatientTagDto);
    return await this.patientTagRepository.save(newPatientTag);
  }

  async findAll(): Promise<PatientTag[]> {
    return await this.patientTagRepository.find({
      relations: ['patient', 'tag'],
    });
  }

  async findOne(id: string): Promise<PatientTag> {
    const patientTag = await this.patientTagRepository.findOne({
      where: { idPacienteEtiqueta: id },
      relations: ['patient', 'tag'],
    });
    if (!patientTag) {
      throw new NotFoundException(
        `Etiqueta de paciente con ID ${id} no encontrada`,
      );
    }
    return patientTag;
  }

  async update(
    id: string,
    updatePatientTagDto: UpdatePatientTagDto,
  ): Promise<PatientTag> {
    const patientTag = await this.findOne(id);
    this.patientTagRepository.merge(patientTag, updatePatientTagDto);
    return await this.patientTagRepository.save(patientTag);
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientTagRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Etiqueta de paciente con ID ${id} no encontrada`,
      );
    }
  }
}
