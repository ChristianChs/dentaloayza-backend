import { PartialType } from '@nestjs/swagger';
import { CreateMotivoCitaDto } from './create-appointment-reason.dto';

export class UpdateMotivoCitaDto extends PartialType(CreateMotivoCitaDto) {}
