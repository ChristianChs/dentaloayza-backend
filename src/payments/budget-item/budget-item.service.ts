import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetItem } from './entities/budget-item.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ProceduresService } from 'src/procedures/procedures.service';
import { BudgetService } from '../budget/budget.service';

@Injectable()
export class BudgetItemService {
  constructor(
    @InjectRepository(BudgetItem)
    private readonly budgetItemRepository: Repository<BudgetItem>,

    private readonly procedureRepository: ProceduresService,

    private readonly budgetRepository: BudgetService,
  ) {}

  async create(createBudgetItemDto: CreateBudgetItemDto) {
    try {
      const procedure = await this.procedureRepository.findOne(
        createBudgetItemDto.idProcedimiento,
      );

      const budget = await this.budgetRepository.findOne(
        createBudgetItemDto.idPresupuesto,
      );

      const budgetItem = this.budgetItemRepository.create({
        ...createBudgetItemDto,
        procedure: procedure,
        budget: budget,
      });
      await this.budgetItemRepository.save(budgetItem);
      const { procedure: proc, budget: budg, ...data } = budgetItem;
      return {
        ...data,
        uuidProcedure: proc.uuid,
        uuidBudget: budg.uuid,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleExceptionDb(error);
    }
  }

  async createBulk(createBudgetItemsDto: CreateBudgetItemDto[]) {
    const results = [];

    for (const itemDto of createBudgetItemsDto) {
      try {
        const procedure = await this.procedureRepository.findOne(
          itemDto.idProcedimiento,
        );
        const budget = await this.budgetRepository.findOne(
          itemDto.idPresupuesto,
        );

        const budgetItem = this.budgetItemRepository.create({
          ...itemDto,
          procedure: procedure,
          budget: budget,
        });

        await this.budgetItemRepository.save(budgetItem);

        const { procedure: proc, budget: budg, ...data } = budgetItem;
        results.push({
          ...data,
          uuidProcedure: proc.uuid,
          uuidBudget: budg.uuid,
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        this.handleExceptionDb(error);
      }
    }

    return {
      message: `${results.length} items creados exitosamente`,
      items: results,
    };
  }

  async findOne(uuid: string) {
    const budgetItem = await this.budgetItemRepository.findOne({
      where: { uuid },
    });
    if (!budgetItem) {
      throw new NotFoundException(
        `Item - Presupuesto con uuid ${uuid} no encontrado`,
      );
    }
    return budgetItem;
  }

  async update(uuid: string, updateBudgetItemDto: UpdateBudgetItemDto) {
    try {
      const budgetItem = await this.findOne(uuid);

      this.budgetItemRepository.merge(budgetItem, updateBudgetItemDto);

      const updatedBudgetItem =
        await this.budgetItemRepository.save(budgetItem);

      return updatedBudgetItem;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleExceptionDb(error);
    }
  }

  async remove(uuid: string) {
    const budgetItem = await this.findOne(uuid);
    try {
      const result = await this.budgetItemRepository.softDelete(budgetItem.id);
      if (!result.affected)
        throw new NotFoundException(
          `No se pudo eliminar el item - presupuesto con uuid ${uuid}`,
        );
      return {
        message: `Item - Presupuesto con uuid ${uuid} eliminado`,
      };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }
  private handleExceptionDb(error: any) {
    console.log(error);
    if (error.code === 'ER_DUP_ENTRY')
      throw new ConflictException(`El registro ya existe en la base de datos`);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs : ${error.message}`,
    );
  }
}
