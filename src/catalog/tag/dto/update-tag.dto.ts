import { PartialType } from '@nestjs/swagger';
import { CreateEtiquetaDto } from './create-tag.dto';

export class UpdateEtiquetaDto extends PartialType(CreateEtiquetaDto) {}
