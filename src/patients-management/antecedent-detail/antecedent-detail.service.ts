import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AntecedentDetail } from './entities/antecedent-detail.entity';
import { CreateAntecedentDetailDto } from './dto/create-antecedent-detail.dto';
import { UpdateAntecedentDetailDto } from './dto/update-antecedent-detail.dto';
import { AntecedentPatient } from '../antecedent-patient/entities/antecedent-patient.entity';

@Injectable()
export class AntecedentDetailService {
  constructor(
    @InjectRepository(AntecedentDetail)
    private antecedentDetailRepository: Repository<AntecedentDetail>,
    @InjectRepository(AntecedentPatient)
    private antecedentPatientRepository: Repository<AntecedentPatient>,
  ) {}

  async create(
    createAntecedentDetailDto: CreateAntecedentDetailDto,
  ): Promise<AntecedentDetail> {
    const antecedentPatient = await this.antecedentPatientRepository.findOneBy({
      idAntecedentePaciente: createAntecedentDetailDto.idAntecedentePaciente,
    });
    if (!antecedentPatient) {
      throw new NotFoundException(
        `Antecedente de paciente con ID ${createAntecedentDetailDto.idAntecedentePaciente} no encontrado`,
      );
    }

    const newAntecedentDetail = this.antecedentDetailRepository.create(
      createAntecedentDetailDto,
    );
    return await this.antecedentDetailRepository.save(newAntecedentDetail);
  }

  async findAll(): Promise<AntecedentDetail[]> {
    return await this.antecedentDetailRepository.find({
      relations: ['antecedentPatient'],
    });
  }

  async findOne(id: string): Promise<AntecedentDetail> {
    const antecedentDetail = await this.antecedentDetailRepository.findOne({
      where: { idAntecedenteDetalle: id },
      relations: ['antecedentPatient'],
    });
    if (!antecedentDetail) {
      throw new NotFoundException(
        `Detalle de antecedente con ID ${id} no encontrado`,
      );
    }
    return antecedentDetail;
  }

  async update(
    id: string,
    updateAntecedentDetailDto: UpdateAntecedentDetailDto,
  ): Promise<AntecedentDetail> {
    const antecedentDetail = await this.findOne(id);
    this.antecedentDetailRepository.merge(
      antecedentDetail,
      updateAntecedentDetailDto,
    );
    return await this.antecedentDetailRepository.save(antecedentDetail);
  }

  async remove(id: string): Promise<void> {
    const result = await this.antecedentDetailRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Detalle de antecedente con ID ${id} no encontrado`,
      );
    }
  }
}
