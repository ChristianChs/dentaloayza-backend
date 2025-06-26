import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Odontogram } from './entities/odontogram.entity';
import { CreateOdontogramDto } from './dto/create-odontogram.dto';
import { UpdateOdontogramDto } from './dto/update-odontogram.dto';

@Injectable()
export class OdontogramService {
  constructor(
    @InjectRepository(Odontogram)
    private odontogramRepository: Repository<Odontogram>,
  ) {}

  async create(createOdontogramDto: CreateOdontogramDto): Promise<Odontogram> {
    const newOdontogram = this.odontogramRepository.create(createOdontogramDto);
    return this.odontogramRepository.save(newOdontogram);
  }

  async findAll(): Promise<Odontogram[]> {
    return this.odontogramRepository.find({ where: { isActive: true } });
  }

  async findOne(uuid: string): Promise<Odontogram> {
    const odontogram = await this.odontogramRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!odontogram) {
      throw new NotFoundException(`Odontogram with UUID "${uuid}" not found`);
    }
    return odontogram;
  }

  async update(
    uuid: string,
    updateOdontogramDto: UpdateOdontogramDto,
  ): Promise<Odontogram> {
    const odontogram = await this.findOne(uuid);
    this.odontogramRepository.merge(odontogram, updateOdontogramDto);
    return this.odontogramRepository.save(odontogram);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.odontogramRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Odontogram with UUID "${uuid}" not found or already deleted`,
      );
    }
  }
}
