import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentItemService } from './payment-item.service';
import { CreatePaymentItemsDto } from './dto/create-payment-item.dto';

@Controller('payment-item')
export class PaymentItemController {
  constructor(private readonly paymentItemService: PaymentItemService) {}

  @Post()
  create(@Body() createPaymentItemsDto: CreatePaymentItemsDto) {
    return this.paymentItemService.createBulk(createPaymentItemsDto.items);
  }

  @Get()
  findAll() {
    return this.paymentItemService.findAll();
  }
}
