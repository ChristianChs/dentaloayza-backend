import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}

  async findAll() {
    return await this.specialtyRepository.find();
  }

  async findOne(uuid: string) {
    const specialty = await this.specialtyRepository.findOne({
      where: { uuid },
    });
    if (!specialty) {
      throw new NotFoundException(
        `Especialidad con uuid ${uuid} no encontrada`,
      );
    }
    return specialty;
  }

  async create(createSpecialtyDto: any) {
    try {
      const specialty = this.specialtyRepository.create(createSpecialtyDto);
      await this.specialtyRepository.save(specialty);
      return specialty;
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async update(uuid: string, updateSpecialtyDto: any) {
    const specialty = await this.findOne(uuid);
    try {
      await this.specialtyRepository.update({ uuid }, updateSpecialtyDto);
      return { ...specialty, ...updateSpecialtyDto };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async remove(uuid: string) {
    const specialty = await this.findOne(uuid);
    try {
      const result = await this.specialtyRepository.softDelete(specialty.id);
      if (!result.affected)
        throw new NotFoundException(
          `No se pudo eliminar la especialidad con uuid ${uuid}`,
        );
      return {
        message: `Especialidad con uuid ${uuid} eliminada`,
      };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  // SECCIÓN PRIVADA
  private handleExceptionDb(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new ConflictException(`El registro ya existe en la base de datos`);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs : ${error.message}`,
    );
  }
}
