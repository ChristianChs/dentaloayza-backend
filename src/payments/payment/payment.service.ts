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

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly specialistService: SpecialistService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const specialistExist = await this.specialistService.findOne(
        createPaymentDto.uuidEspecialista,
      );
      const payment = this.paymentRepository.create({
        ...createPaymentDto,
        especialista: specialistExist,
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
