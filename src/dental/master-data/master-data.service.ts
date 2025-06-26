import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindingTypeDefinition } from './entities/finding-type-definition.entity';
import { DentalSurfaceTypeDefinition } from './entities/dental-surface-type-definition.entity';
import { CariesDetailDefinition } from './entities/caries-detail-definition.entity';
import { CreateFindingTypeDefinitionDto } from './dto/create-finding-type-definition.dto';
import { UpdateFindingTypeDefinitionDto } from './dto/update-finding-type-definition.dto';
import { CreateDentalSurfaceTypeDefinitionDto } from './dto/create-dental-surface-type-definition.dto';
import { UpdateDentalSurfaceTypeDefinitionDto } from './dto/update-dental-surface-type-definition.dto';
import { CreateCariesDetailDefinitionDto } from './dto/create-caries-detail-definition.dto';
import { UpdateCariesDetailDefinitionDto } from './dto/update-caries-detail-definition.dto';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectRepository(FindingTypeDefinition)
    private findingTypeDefinitionRepository: Repository<FindingTypeDefinition>,
    @InjectRepository(DentalSurfaceTypeDefinition)
    private dentalSurfaceTypeDefinitionRepository: Repository<DentalSurfaceTypeDefinition>,
    @InjectRepository(CariesDetailDefinition)
    private cariesDetailDefinitionRepository: Repository<CariesDetailDefinition>,
  ) {}

  async createFindingTypeDefinition(
    dto: CreateFindingTypeDefinitionDto,
  ): Promise<FindingTypeDefinition> {
    const newDef = this.findingTypeDefinitionRepository.create(dto);
    return this.findingTypeDefinitionRepository.save(newDef);
  }

  async findAllFindingTypeDefinitions(): Promise<FindingTypeDefinition[]> {
    return this.findingTypeDefinitionRepository.find({
      where: { isActive: true },
    });
  }

  async findOneFindingTypeDefinition(
    uuid: string,
  ): Promise<FindingTypeDefinition> {
    const def = await this.findingTypeDefinitionRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!def) {
      throw new NotFoundException(
        `FindingTypeDefinition with UUID "${uuid}" not found`,
      );
    }
    return def;
  }

  async updateFindingTypeDefinition(
    uuid: string,
    dto: UpdateFindingTypeDefinitionDto,
  ): Promise<FindingTypeDefinition> {
    const def = await this.findOneFindingTypeDefinition(uuid);
    this.findingTypeDefinitionRepository.merge(def, dto);
    return this.findingTypeDefinitionRepository.save(def);
  }

  async removeFindingTypeDefinition(uuid: string): Promise<void> {
    const result = await this.findingTypeDefinitionRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `FindingTypeDefinition with UUID "${uuid}" not found or already deleted`,
      );
    }
  }

  async createDentalSurfaceTypeDefinition(
    dto: CreateDentalSurfaceTypeDefinitionDto,
  ): Promise<DentalSurfaceTypeDefinition> {
    const newDef = this.dentalSurfaceTypeDefinitionRepository.create(dto);
    return this.dentalSurfaceTypeDefinitionRepository.save(newDef);
  }

  async findAllDentalSurfaceTypeDefinitions(): Promise<
    DentalSurfaceTypeDefinition[]
  > {
    return this.dentalSurfaceTypeDefinitionRepository.find({
      where: { isActive: true },
    });
  }

  async findOneDentalSurfaceTypeDefinition(
    uuid: string,
  ): Promise<DentalSurfaceTypeDefinition> {
    const def = await this.dentalSurfaceTypeDefinitionRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!def) {
      throw new NotFoundException(
        `DentalSurfaceTypeDefinition with UUID "${uuid}" not found`,
      );
    }
    return def;
  }

  async updateDentalSurfaceTypeDefinition(
    uuid: string,
    dto: UpdateDentalSurfaceTypeDefinitionDto,
  ): Promise<DentalSurfaceTypeDefinition> {
    const def = await this.findOneDentalSurfaceTypeDefinition(uuid);
    this.dentalSurfaceTypeDefinitionRepository.merge(def, dto);
    return this.dentalSurfaceTypeDefinitionRepository.save(def);
  }

  async removeDentalSurfaceTypeDefinition(uuid: string): Promise<void> {
    const result = await this.dentalSurfaceTypeDefinitionRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `DentalSurfaceTypeDefinition with UUID "${uuid}" not found or already deleted`,
      );
    }
  }

  async createCariesDetailDefinition(
    dto: CreateCariesDetailDefinitionDto,
  ): Promise<CariesDetailDefinition> {
    const newDef = this.cariesDetailDefinitionRepository.create(dto);
    return this.cariesDetailDefinitionRepository.save(newDef);
  }

  async findAllCariesDetailDefinitions(): Promise<CariesDetailDefinition[]> {
    return this.cariesDetailDefinitionRepository.find({
      where: { isActive: true },
    });
  }

  async findOneCariesDetailDefinition(
    uuid: string,
  ): Promise<CariesDetailDefinition> {
    const def = await this.cariesDetailDefinitionRepository.findOne({
      where: { uuid, isActive: true },
    });
    if (!def) {
      throw new NotFoundException(
        `CariesDetailDefinition with UUID "${uuid}" not found`,
      );
    }
    return def;
  }

  async updateCariesDetailDefinition(
    uuid: string,
    dto: UpdateCariesDetailDefinitionDto,
  ): Promise<CariesDetailDefinition> {
    const def = await this.findOneCariesDetailDefinition(uuid);
    this.cariesDetailDefinitionRepository.merge(def, dto);
    return this.cariesDetailDefinitionRepository.save(def);
  }

  async removeCariesDetailDefinition(uuid: string): Promise<void> {
    const result = await this.cariesDetailDefinitionRepository.softDelete({
      uuid,
      isActive: true,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `CariesDetailDefinition with UUID "${uuid}" not found or already deleted`,
      );
    }
  }
}
