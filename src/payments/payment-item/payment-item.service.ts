import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentItemDto } from './dto/create-payment-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentItem } from './entities/payment-item.entity';
import { PaymentService } from '../payment/payment.service';
import { Repository } from 'typeorm';
import { BudgetItemService } from '../budget-item/budget-item.service';

@Injectable()
export class PaymentItemService {
  constructor(
    @InjectRepository(PaymentItem)
    private readonly paymentItemRepository: Repository<PaymentItem>,

    private readonly paymentService: PaymentService,

    private readonly budgetItemService: BudgetItemService,
  ) {}

  async create(createPaymentItemDto: CreatePaymentItemDto) {
    try {
      const paymentExist = await this.paymentService.findOne(
        createPaymentItemDto.uuidPago,
      );

      const budgetItemExist = await this.budgetItemService.findOne(
        createPaymentItemDto.uuidPresupuestoItem,
      );

      const paymentItem = this.paymentItemRepository.create({
        ...createPaymentItemDto,
        pago: paymentExist,
        presupuestoItem: budgetItemExist,
      });
      await this.paymentItemRepository.save(paymentItem);
      const { pago, presupuestoItem, ...data } = paymentItem;
      return {
        ...data,
        uuidPago: pago.uuid,
        uuidPresupuestoItem: presupuestoItem.uuid,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handleExceptionDb(error);
    }
  }

  async createBulk(createPaymentItemsDto: CreatePaymentItemDto[]) {
    const results = [];

    for (const itemDto of createPaymentItemsDto) {
      try {
        const payment = await this.paymentService.findOne(itemDto.uuidPago);
        const budgetItem = await this.budgetItemService.findOne(
          itemDto.uuidPresupuestoItem,
        );

        const paymentItem = this.paymentItemRepository.create({
          ...itemDto,
          pago: payment,
          presupuestoItem: budgetItem,
        });

        await this.paymentItemRepository.save(paymentItem);

        const { pago, presupuestoItem, ...data } = paymentItem;
        results.push({
          ...data,
          uuidPago: pago.uuid,
          uuidPresupuestoItem: presupuestoItem.uuid,
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        this.handleExceptionDb(error);
      }
    }

    return {
      message: `${results.length} payment items creados exitosamente`,
      items: results,
    };
  }
  async findAll() {
    return await this.paymentItemRepository.find();
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
