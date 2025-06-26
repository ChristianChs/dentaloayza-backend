import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OdontogramFindingServiceEntity } from './entities/odontogram-finding-service.entity';
import { CreateOdontogramFindingServiceDto } from './dto/create-odontogram-finding-service.dto';
import { UpdateOdontogramFindingServiceDto } from './dto/update-odontogram-finding-service.dto';

@Injectable()
export class OdontogramFindingServiceService {
  constructor(
    @InjectRepository(OdontogramFindingServiceEntity)
    private odontogramFindingServiceRepository: Repository<OdontogramFindingServiceEntity>,
  ) {}

  async create(
    createOdontogramFindingServiceDto: CreateOdontogramFindingServiceDto,
  ): Promise<OdontogramFindingServiceEntity> {
    const newService = this.odontogramFindingServiceRepository.create(
      createOdontogramFindingServiceDto,
    );
    return this.odontogramFindingServiceRepository.save(newService);
  }

  async findAll(): Promise<OdontogramFindingServiceEntity[]> {
    return this.odontogramFindingServiceRepository.find({
      where: { isActive: true },
    });
  }

  async findOne(uuid: string): Promise<OdontogramFindingServiceEntity> {
    const service = await this.odontogramFindingServiceRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!service) {
      throw new NotFoundException(
        `OdontogramFindingService with UUID "${uuid}" not found`,
      );
    }
    return service;
  }

  async update(
    uuid: string,
    updateOdontogramFindingServiceDto: UpdateOdontogramFindingServiceDto,
  ): Promise<OdontogramFindingServiceEntity> {
    const service = await this.findOne(uuid);
    this.odontogramFindingServiceRepository.merge(
      service,
      updateOdontogramFindingServiceDto,
    );
    return this.odontogramFindingServiceRepository.save(service);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.odontogramFindingServiceRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `OdontogramFindingService with UUID "${uuid}" not found or already deleted`,
      );
    }
  }
}
