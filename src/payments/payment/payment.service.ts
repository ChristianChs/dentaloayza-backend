import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { SpecialistService } from 'src/staff/specialist/specialist.service';
import { Patient } from 'src/patients-management/patient/entities/patient.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    private readonly specialistService: SpecialistService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const specialistExist = await this.specialistService.findOne(
        createPaymentDto.uuidEspecialista,
      );
      const patient = await this.patientRepository.findOne({
        where: { idPaciente: createPaymentDto.uuidPaciente },
        relations: ['persona'],
      });

      if (!patient) {
        throw new NotFoundException(
          `Paciente con ID ${createPaymentDto.uuidPaciente} no encontrado`,
        );
      }

      const payment = this.paymentRepository.create({
        ...createPaymentDto,
        especialista: specialistExist,
        paciente: patient,
      });
      await this.paymentRepository.save(payment);
      const { especialista, ...data } = payment;
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

  async findAll() {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.especialista', 'especialista')
      .leftJoinAndSelect('especialista.persona', 'persona')
      .leftJoinAndSelect('payment.items', 'items');
    return queryBuilder.getMany();
  }

  async findByPatient(uuid: string) {
    // obtener igual que findall pero filtrando por paciente
    const queryBuilder = this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.especialista', 'especialista')
      .leftJoinAndSelect('especialista.persona', 'persona')
      .leftJoinAndSelect('payment.paciente', 'paciente') // ✅ Agregar JOIN con paciente
      .leftJoinAndSelect('paciente.persona', 'pacientePersona') // ✅ JOIN con persona del paciente
      .leftJoinAndSelect('payment.items', 'items')
      .where('paciente.idPaciente = :uuid', { uuid });
    return await queryBuilder.getMany();
  }

  async findOne(uuid: string) {
    const payment = await this.paymentRepository.findOne({
      where: { uuid },
      relations: ['especialista', 'items'],
    });
    if (!payment) {
      throw new NotFoundException(`Pago con uuid ${uuid} no encontrado`);
    }
    const { especialista, ...data } = payment;
    return {
      ...data,
      uuidEspecialista: especialista.uuid,
    };
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
