import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Antecedente } from './entities/antecedent.entity';
import { CreateAntecedenteDto } from './dto/create-antecedent.dto';
import { UpdateAntecedenteDto } from './dto/update-antecedent.dto';

@Injectable()
export class AntecedenteService {
  constructor(
    @InjectRepository(Antecedente)
    private antecedenteRepository: Repository<Antecedente>,
  ) {}

  async create(
    createAntecedenteDto: CreateAntecedenteDto,
  ): Promise<Antecedente> {
    const newAntecedente =
      this.antecedenteRepository.create(createAntecedenteDto);
    return await this.antecedenteRepository.save(newAntecedente);
  }

  async findAll(): Promise<Antecedente[]> {
    return await this.antecedenteRepository.find();
  }

  async findOne(uuid: string): Promise<Antecedente> {
    const antecedente = await this.antecedenteRepository.findOne({
      where: { uuid },
    });
    if (!antecedente) {
      throw new NotFoundException(`Antecedente con UUID ${uuid} no encontrado`);
    }
    return antecedente;
  }

  async update(
    uuid: string,
    updateAntecedenteDto: UpdateAntecedenteDto,
  ): Promise<Antecedente> {
    const antecedente = await this.findOne(uuid);
    this.antecedenteRepository.merge(antecedente, updateAntecedenteDto);
    return await this.antecedenteRepository.save(antecedente);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.antecedenteRepository.softDelete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException(`Antecedente con UUID ${uuid} no encontrado`);
    }
  }
}
