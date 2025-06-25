import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { Procedure } from './entities/procedure.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async create(createProcedureDto: CreateProcedureDto) {
    try {
      const procedure = this.procedureRepository.create(createProcedureDto);
      await this.procedureRepository.save(procedure);
      return procedure;
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async findAll() {
    return this.procedureRepository.find();
  }

  async findOne(uuid: string) {
    const procedure = await this.procedureRepository.findOne({
      where: { uuid },
    });
    if (!procedure) {
      throw new NotFoundException(`Procedure with UUID ${uuid} not found`);
    }
    return procedure;
  }

  async update(uuid: string, updateProcedureDto: UpdateProcedureDto) {
    const procedure = await this.findOne(uuid);
    try {
      await this.procedureRepository.update({ uuid }, updateProcedureDto);
      return { ...procedure, ...updateProcedureDto };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async remove(uuid: string) {
    const procedure = await this.findOne(uuid);
    try {
      const result = await this.procedureRepository.softDelete(procedure.id);
      if (!result.affected)
        throw new NotFoundException(
          `Could not delete procedure with UUID ${uuid}`,
        );
      return {
        message: `Procedure with UUID ${uuid} successfully deleted`,
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
