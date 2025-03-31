import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll() {
    return await this.personRepository.find();
  }

  async findOne(uuid: string) {
    const person = await this.personRepository.findOne({ where: { uuid } });
    if (!person) {
      throw new NotFoundException(`Persona con uuid ${uuid} no encontrada`);
    }
    return person;
  }

  async create(createPersonDto: CreatePersonDto) {
    try {
      const person = this.personRepository.create(createPersonDto);
      await this.personRepository.save(person);
      return person;
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async update(uuid: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(uuid);
    try {
      await this.personRepository.update({ uuid }, updatePersonDto);
      return { ...person, ...updatePersonDto };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async remove(uuid: string) {
    const person = await this.findOne(uuid);
    try {
      const result = await this.personRepository.softDelete(person.id);
      if (!result.affected)
        throw new NotFoundException(
          `No se pudo eliminar la persona con uuid ${uuid}`,
        );
      return {
        message: `Persona con uuid ${uuid} eliminada`,
      };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  // SECCIÓN PRIVADA
  private handleExceptionDb(error: any) {
    console.log(error);
    if (error.code === 'ER_DUP_ENTRY')
      throw new ConflictException(`El registro ya existe en la base de datos`);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs : ${error.message}`,
    );
  }
}
