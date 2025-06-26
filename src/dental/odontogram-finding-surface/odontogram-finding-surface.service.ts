import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OdontogramFindingSurface } from './entities/odontogram-finding-surface.entity';
import { CreateOdontogramFindingSurfaceDto } from './dto/create-odontogram-finding-surface.dto';
import { UpdateOdontogramFindingSurfaceDto } from './dto/update-odontogram-finding-surface.dto';

@Injectable()
export class OdontogramFindingSurfaceService {
  constructor(
    @InjectRepository(OdontogramFindingSurface)
    private odontogramFindingSurfaceRepository: Repository<OdontogramFindingSurface>,
  ) {}

  async create(
    createOdontogramFindingSurfaceDto: CreateOdontogramFindingSurfaceDto,
  ): Promise<OdontogramFindingSurface> {
    const newSurface = this.odontogramFindingSurfaceRepository.create(
      createOdontogramFindingSurfaceDto,
    );
    return this.odontogramFindingSurfaceRepository.save(newSurface);
  }

  async findAll(): Promise<OdontogramFindingSurface[]> {
    return this.odontogramFindingSurfaceRepository.find({
      where: { isActive: true },
    });
  }

  async findOne(uuid: string): Promise<OdontogramFindingSurface> {
    const surface = await this.odontogramFindingSurfaceRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!surface) {
      throw new NotFoundException(
        `OdontogramFindingSurface with UUID "${uuid}" not found`,
      );
    }
    return surface;
  }

  async update(
    uuid: string,
    updateOdontogramFindingSurfaceDto: UpdateOdontogramFindingSurfaceDto,
  ): Promise<OdontogramFindingSurface> {
    const surface = await this.findOne(uuid);
    this.odontogramFindingSurfaceRepository.merge(
      surface,
      updateOdontogramFindingSurfaceDto,
    );
    return this.odontogramFindingSurfaceRepository.save(surface);
  }

  async remove(uuid: string): Promise<void> {
    const result = await this.odontogramFindingSurfaceRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `OdontogramFindingSurface with UUID "${uuid}" not found or already deleted`,
      );
    }
  }
}
