import { PartialType } from '@nestjs/swagger';
import { CreatePaymentItemDto } from './create-payment-item.dto';

export class UpdatePaymentItemDto extends PartialType(CreatePaymentItemDto) {}
