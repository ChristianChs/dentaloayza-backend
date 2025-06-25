import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etiqueta } from './entities/tag.entity';
import { CreateEtiquetaDto } from './dto/create-tag.dto';
import { UpdateEtiquetaDto } from './dto/update-tag.dto';

@Injectable()
export class EtiquetaService {
  constructor(
    @InjectRepository(Etiqueta)
    private etiquetaRepository: Repository<Etiqueta>,
  ) {}

  async create(createEtiquetaDto: CreateEtiquetaDto): Promise<Etiqueta> {
    const newEtiqueta = this.etiquetaRepository.create(createEtiquetaDto);
    return await this.etiquetaRepository.save(newEtiqueta);
  }

  async findAll(): Promise<Etiqueta[]> {
    return await this.etiquetaRepository.find();
  }

  async findOne(uuid: string): Promise<Etiqueta> {
    const etiqueta = await this.etiquetaRepository.findOne({ where: { uuid } });
    if (!etiqueta) {
      throw new NotFoundException(`Etiqueta con UUID ${uuid} no encontrada`);
    }
    return etiqueta;
  }

  async update(
    uuid: string,
    updateEtiquetaDto: UpdateEtiquetaDto,
  ): Promise<Etiqueta> {
    const etiqueta = await this.findOne(uuid);
    this.etiquetaRepository.merge(etiqueta, updateEtiquetaDto);
    return await this.etiquetaRepository.save(etiqueta);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.etiquetaRepository.softDelete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException(`Etiqueta con UUID ${uuid} no encontrada`);
    }
  }
}
