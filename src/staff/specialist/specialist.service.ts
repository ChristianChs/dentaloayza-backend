import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialist } from './entities/specialist.entity';
import { Repository } from 'typeorm';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { SpecialtyService } from '../specialty/specialty.service';
import { PersonService } from '../person/person.service';
import { plainToInstance } from 'class-transformer';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';

@Injectable()
export class SpecialistService {
  constructor(
    @InjectRepository(Specialist)
    private readonly specialistRepository: Repository<Specialist>,

    private readonly specialtyService: SpecialtyService,

    private readonly personService: PersonService,
  ) {}

  async findAll() {
    const data = await this.specialistRepository.find({
      relations: ['persona', 'especialidad'],
    });

    return plainToInstance(Specialist, data);
  }

  async findOne(uuid: string) {
    const specialist = await this.specialistRepository.findOne({
      relations: ['persona', 'especialidad'],
      where: { uuid },
    });
    if (!specialist) {
      throw new NotFoundException(
        `Especialista con uuid ${uuid} no encontrado`,
      );
    }
    return plainToInstance(Specialist, specialist);
  }

  async create(createSpecialistDto: CreateSpecialistDto) {
    try {
      const personExist = await this.personService.findOne(
        createSpecialistDto.uuidPersona,
      );

      let specialtyExist = null;
      if (createSpecialistDto.idEspecialidad) {
        specialtyExist = await this.specialtyService.findOne(
          createSpecialistDto.idEspecialidad,
        );
      }
      const specialist = this.specialistRepository.create({
        ...createSpecialistDto,
        persona: personExist,
        especialidad: specialtyExist,
      });
      await this.specialistRepository.save(specialist);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { persona, especialidad, ...data } = specialist;
      return {
        ...data,
        uuidPersona: personExist.uuid,
        uuidEspecialidad: specialtyExist?.uuid || null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleExceptionDb(error);
    }
  }

  async update(uuid: string, updateSpecialistDto: UpdateSpecialistDto) {
    const specialist = await this.findOne(uuid);

    const { uuidPersona, idEspecialidad, fechaIngreso } = updateSpecialistDto;

    let personExist = specialist.persona;
    let specialtyExist = specialist.especialidad;

    if (uuidPersona) {
      personExist = await this.personService.findOne(uuidPersona);
    }
    if (idEspecialidad) {
      specialtyExist = await this.specialtyService.findOne(idEspecialidad);
    }
    try {
      await this.specialistRepository.update(
        { uuid },
        { persona: personExist, especialidad: specialtyExist, fechaIngreso },
      );
      return {
        ...specialist,
        persona: personExist,
        especialidad: specialtyExist,
        fechaIngreso,
      };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }

  async remove(uuid: string) {
    const specialist = await this.findOne(uuid);
    try {
      const result = await this.specialistRepository.softDelete(specialist.id);
      if (!result.affected)
        throw new NotFoundException(
          `No se pudo eliminar el especialista con uuid ${uuid}`,
        );
      return {
        message: `El especialista con uuid ${uuid} fue eliminado`,
      };
    } catch (error) {
      this.handleExceptionDb(error);
    }
  }
  async findByUserUuid(userUuid: string) {
    const specialist = await this.specialistRepository.findOne({
      where: { user: { uuid: userUuid } },
      relations: ['persona', 'especialidad', 'user'],
    });

    if (!specialist) {
      throw new NotFoundException(
        `No se encontró especialista asociado al usuario con UUID ${userUuid}`,
      );
    }

    return plainToInstance(Specialist, specialist);
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
