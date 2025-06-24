import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotivoCita } from './entities/appointment-reason.entity';
import { CreateMotivoCitaDto } from './dto/create-appointment-reason.dto';
import { UpdateMotivoCitaDto } from './dto/update-appointment-reason.dto';

@Injectable()
export class MotivoCitaService {
  constructor(
    @InjectRepository(MotivoCita)
    private motivoCitaRepository: Repository<MotivoCita>,
  ) {}

  async create(createMotivoCitaDto: CreateMotivoCitaDto): Promise<MotivoCita> {
    const newMotivoCita = this.motivoCitaRepository.create(createMotivoCitaDto);
    return await this.motivoCitaRepository.save(newMotivoCita);
  }

  async findAll(): Promise<MotivoCita[]> {
    return await this.motivoCitaRepository.find();
  }

  async findOne(uuid: string): Promise<MotivoCita> {
    const motivoCita = await this.motivoCitaRepository.findOne({
      where: { uuid },
    });
    if (!motivoCita) {
      throw new NotFoundException(
        `Motivo de cita con UUID ${uuid} no encontrado`,
      );
    }
    return motivoCita;
  }

  async update(
    uuid: string,
    updateMotivoCitaDto: UpdateMotivoCitaDto,
  ): Promise<MotivoCita> {
    const motivoCita = await this.findOne(uuid);
    this.motivoCitaRepository.merge(motivoCita, updateMotivoCitaDto);
    return await this.motivoCitaRepository.save(motivoCita);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.motivoCitaRepository.softDelete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Motivo de cita con UUID ${uuid} no encontrado`,
      );
    }
  }
}
