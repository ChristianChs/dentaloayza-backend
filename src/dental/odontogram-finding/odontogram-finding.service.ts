import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OdontogramFinding } from './entities/odontogram-finding.entity';
import { CreateOdontogramFindingDto } from './dto/create-odontogram-finding.dto';
import { UpdateOdontogramFindingDto } from './dto/update-odontogram-finding.dto';

@Injectable()
export class OdontogramFindingService {
  constructor(
    @InjectRepository(OdontogramFinding)
    private odontogramFindingRepository: Repository<OdontogramFinding>,
  ) {}

  async create(
    createOdontogramFindingDto: CreateOdontogramFindingDto,
  ): Promise<OdontogramFinding> {
    const newFinding = this.odontogramFindingRepository.create(
      createOdontogramFindingDto,
    );
    return this.odontogramFindingRepository.save(newFinding);
  }

  async findAll(): Promise<OdontogramFinding[]> {
    return this.odontogramFindingRepository.find({ where: { isActive: true } });
  }

  async findOne(uuid: string): Promise<OdontogramFinding> {
    const finding = await this.odontogramFindingRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!finding) {
      throw new NotFoundException(
        `OdontogramFinding with UUID "${uuid}" not found`,
      );
    }
    return finding;
  }

  async update(
    uuid: string,
    updateOdontogramFindingDto: UpdateOdontogramFindingDto,
  ): Promise<OdontogramFinding> {
    const finding = await this.findOne(uuid);
    this.odontogramFindingRepository.merge(finding, updateOdontogramFindingDto);
    return this.odontogramFindingRepository.save(finding);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.odontogramFindingRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `OdontogramFinding with UUID "${uuid}" not found or already deleted`,
      );
    }
  }
}
