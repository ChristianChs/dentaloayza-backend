import { PartialType } from '@nestjs/swagger';
import { CreateDentalStatusDto } from './create-dental-status.dto';

export class UpdateDentalStatusDto extends PartialType(CreateDentalStatusDto) {}
