import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Odontogram2 } from './entities/odontogram2.entity';
import { CreateOdontogramDto } from './dto/create-odontogram2.dto';
import { UpdateOdontogramDto } from './dto/update-odontogram2.dto';

@Injectable()
export class Odontogram2Service {
  constructor(
    @InjectRepository(Odontogram2)
    private readonly odontogramRepository: Repository<Odontogram2>,
  ) {}

  async create(dto: CreateOdontogramDto): Promise<Odontogram2> {
    const odontograma = this.odontogramRepository.create({
      patientId: dto.patientId,
      data: dto.data,
    });

    return await this.odontogramRepository.save(odontograma);
  }

  async findAll(): Promise<Odontogram2[]> {
    return await this.odontogramRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findLatestByPatient(patientId: string): Promise<Odontogram2> {
    const latest = await this.odontogramRepository.findOne({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });

    if (!latest) {
      throw new NotFoundException(
        `No se encontró un odontograma para el paciente ${patientId}`,
      );
    }

    return latest;
  }

  async findAllByPatient(patientId: string): Promise<Odontogram2[]> {
    return await this.odontogramRepository.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, dto: UpdateOdontogramDto): Promise<Odontogram2> {
    const odontograma = await this.odontogramRepository.findOneBy({ id });
    if (!odontograma) {
      throw new NotFoundException(`Odontograma con ID ${id} no encontrado`);
    }

    this.odontogramRepository.merge(odontograma, dto);
    return await this.odontogramRepository.save(odontograma);
  }

  async remove(id: string): Promise<void> {
    const result = await this.odontogramRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Odontograma con ID ${id} no encontrado`);
    }
  }
}
