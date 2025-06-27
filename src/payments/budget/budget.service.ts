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

  findAll() {
    return `This action returns all budget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
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
