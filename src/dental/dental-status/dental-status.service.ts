import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DentalStatus } from './entities/dental-status.entity';
import { CreateDentalStatusDto } from './dto/create-dental-status.dto';
import { UpdateDentalStatusDto } from './dto/update-dental-status.dto';

@Injectable()
export class DentalStatusService {
  constructor(
    @InjectRepository(DentalStatus)
    private dentalStatusRepository: Repository<DentalStatus>,
  ) {}

  async create(
    createDentalStatusDto: CreateDentalStatusDto,
  ): Promise<DentalStatus> {
    const newStatus = this.dentalStatusRepository.create(createDentalStatusDto);
    return this.dentalStatusRepository.save(newStatus);
  }

  async findAll(): Promise<DentalStatus[]> {
    return this.dentalStatusRepository.find({ where: { isActive: true } });
  }

  async findOne(uuid: string): Promise<DentalStatus> {
    const status = await this.dentalStatusRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!status) {
      throw new NotFoundException(`DentalStatus with UUID "${uuid}" not found`);
    }
    return status;
  }

  async update(
    uuid: string,
    updateDentalStatusDto: UpdateDentalStatusDto,
  ): Promise<DentalStatus> {
    const status = await this.findOne(uuid);
    this.dentalStatusRepository.merge(status, updateDentalStatusDto);
    return this.dentalStatusRepository.save(status);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.dentalStatusRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `DentalStatus with UUID "${uuid}" not found or already deleted`,
      );
    }
  }
}
