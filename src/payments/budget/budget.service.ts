import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { SpecialistService } from 'src/staff/specialist/specialist.service';
import { BudgetItem } from '../budget-item/entities/budget-item.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,

    private readonly specialistRepository: SpecialistService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto) {
    try {
      const specialist = await this.specialistRepository.findOne(
        createBudgetDto.idEspecialista,
      );
      const budget = this.budgetRepository.create({
        ...createBudgetDto,
        especialista: specialist,
      });
      await this.budgetRepository.save(budget);
      const { especialista, ...data } = budget;
      return {
        ...data,
        uuidEspecialista: especialista.uuid,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleExceptionDb(error);
    }
  }

  async findAll(includeInactive: boolean = false) {
    const queryBuilder = this.budgetRepository
      .createQueryBuilder('budget')
      .leftJoinAndSelect('budget.especialista', 'especialista')
      .leftJoinAndSelect('especialista.persona', 'persona')
      .leftJoinAndSelect('budget.items', 'items')
      .leftJoinAndSelect('items.procedure', 'procedure')
      .leftJoinAndSelect('items.pagoItems', 'pagoItems');

    if (!includeInactive) {
      queryBuilder
        .where('budget.estado != :estado', { estado: 'Cancelado' })
        .andWhere('(items.id IS NULL OR items.isActive = :isActive)', {
          isActive: true,
        });
    }

    const budgets = await queryBuilder.getMany();

    // Calcular montoPagado para cada item
    return budgets.map((budget) => ({
      ...budget,
      items:
        budget.items?.map((item) => ({
          ...item,
          montoPagado:
            item.pagoItems?.reduce(
              (sum, pagoItem) => sum + Number(pagoItem.montoAbonado),
              0,
            ) || 0,
          pagoItems: undefined, // Opcional: remover pagoItems del resultado final
        })) || [],
    }));
  }

  async findOne(uuid: string) {
    const budget = await this.budgetRepository.findOne({
      where: { uuid },
      relations: ['especialista'],
    });
    if (!budget) {
      throw new NotFoundException(`Presupuesto con uuid ${uuid} no encontrado`);
    }
    return budget;
  }

  async update(uuid: string, updateBudgetDto: UpdateBudgetDto) {
    return await this.budgetRepository.manager.transaction(async (manager) => {
      const budget = await manager.findOne(Budget, {
        where: { uuid },
        relations: ['items', 'especialista'],
      });

      if (!budget) {
        throw new NotFoundException(
          `Presupuesto con uuid ${uuid} no encontrado`,
        );
      }

      // Validar especialista si se está cambiando
      let newSpecialist = budget.especialista;
      if (
        updateBudgetDto.idEspecialista &&
        updateBudgetDto.idEspecialista !== budget.especialista.uuid
      ) {
        newSpecialist = await this.specialistRepository.findOne(
          updateBudgetDto.idEspecialista,
        );
        if (!newSpecialist) {
          throw new NotFoundException(
            `Especialista con uuid ${updateBudgetDto.idEspecialista} no encontrado`,
          );
        }
      }

      // Manejar cancelación de presupuesto
      if (
        updateBudgetDto.estado === 'Cancelado' &&
        budget.estado !== 'Cancelado'
      ) {
        // Inhabilitar todos los items relacionados
        await manager.update(
          BudgetItem,
          { budget: { id: budget.id } },
          { isActive: false },
        );
      }

      // Manejar reactivación de presupuesto
      if (
        budget.estado === 'Cancelado' &&
        updateBudgetDto.estado &&
        updateBudgetDto.estado !== 'Cancelado'
      ) {
        // Reactivar todos los items relacionados
        await manager.update(
          BudgetItem,
          { budget: { id: budget.id } },
          { isActive: true },
        );
      }

      // Preparar datos para actualizar
      const updateData: any = { ...updateBudgetDto };
      if (newSpecialist && updateBudgetDto.idEspecialista) {
        updateData.especialista = newSpecialist;
        delete updateData.idEspecialista; // Remover el UUID ya que usamos la entidad
      }

      await manager.update(Budget, { uuid }, updateData);

      return {
        ...budget,
        ...updateBudgetDto,
        especialista: newSpecialist,
      };
    });
  }

  private handleExceptionDb(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new ConflictException(`El registro ya existe en la base de datos`);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs : ${error.message}`,
    );
  }
}
