import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { plainToInstance } from 'class-transformer';
import {
  CreateProcedureDto,
  ProcedureResponseDto,
  UpdateProcedureDto,
} from './dto';
import { ApiAuth } from 'src/common/decorators/api-auth.decorator';

@ApiAuth()
@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  create(@Body() createProcedureDto: CreateProcedureDto) {
    const procedure = this.proceduresService.create(createProcedureDto);
    return plainToInstance(ProcedureResponseDto, procedure, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  findAll() {
    const procedures = this.proceduresService.findAll();
    return plainToInstance(ProcedureResponseDto, procedures, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const procedure = this.proceduresService.findOne(uuid);
    return plainToInstance(ProcedureResponseDto, procedure, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ) {
    const procedure = this.proceduresService.update(uuid, updateProcedureDto);
    return plainToInstance(ProcedureResponseDto, procedure, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.proceduresService.remove(uuid);
  }
}
