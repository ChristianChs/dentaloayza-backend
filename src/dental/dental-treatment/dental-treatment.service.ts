import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DentalTreatment } from './entities/dental-treatment.entity';
import { CreateDentalTreatmentDto } from './dto/create-dental-treatment.dto';
import { UpdateDentalTreatmentDto } from './dto/update-dental-treatment.dto';

@Injectable()
export class DentalTreatmentService {
  constructor(
    @InjectRepository(DentalTreatment)
    private dentalTreatmentRepository: Repository<DentalTreatment>,
  ) {}

  async create(
    createDentalTreatmentDto: CreateDentalTreatmentDto,
  ): Promise<DentalTreatment> {
    const newTreatment = this.dentalTreatmentRepository.create(
      createDentalTreatmentDto,
    );
    return this.dentalTreatmentRepository.save(newTreatment);
  }

  async findAll(): Promise<DentalTreatment[]> {
    return this.dentalTreatmentRepository.find({ where: { isActive: true } });
  }

  async findOne(uuid: string): Promise<DentalTreatment> {
    const treatment = await this.dentalTreatmentRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!treatment) {
      throw new NotFoundException(
        `DentalTreatment with UUID "${uuid}" not found`,
      );
    }
    return treatment;
  }

  async update(
    uuid: string,
    updateDentalTreatmentDto: UpdateDentalTreatmentDto,
  ): Promise<DentalTreatment> {
    const treatment = await this.findOne(uuid);
    this.dentalTreatmentRepository.merge(treatment, updateDentalTreatmentDto);
    return this.dentalTreatmentRepository.save(treatment);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.dentalTreatmentRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `DentalTreatment with UUID "${uuid}" not found or already deleted`,
      );
    }
  }
}
