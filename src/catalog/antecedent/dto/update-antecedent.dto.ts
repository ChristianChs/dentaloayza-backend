import { PartialType } from '@nestjs/swagger';
import { CreateAntecedenteDto } from './create-antecedent.dto';

export class UpdateAntecedenteDto extends PartialType(CreateAntecedenteDto) {}
