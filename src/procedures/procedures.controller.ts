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
import { ApiResponse } from '@nestjs/swagger';
import { ApiAuth } from 'src/common/decorators/api-auth.decorator';

@ApiAuth()
@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Procedure successfully created.',
    type: ProcedureResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid data provided.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Procedure already exists.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  create(@Body() createProcedureDto: CreateProcedureDto) {
    const procedure = this.proceduresService.create(createProcedureDto);
    return plainToInstance(ProcedureResponseDto, procedure, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of procedures.',
    type: [ProcedureResponseDto],
  })
  @ApiResponse({ status: 404, description: 'No procedures found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll() {
    const procedures = this.proceduresService.findAll();
    return plainToInstance(ProcedureResponseDto, procedures, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Returns a procedure by UUID.',
    type: ProcedureResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Procedure not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const procedure = this.proceduresService.findOne(uuid);
    return plainToInstance(ProcedureResponseDto, procedure, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Procedure successfully updated.',
    type: ProcedureResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Procedure not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict error, e.g., duplicate data.',
  })
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
  @ApiResponse({ status: 200, description: 'Procedure successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Procedure not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiResponse({
    status: 409,
    description:
      'Conflict error, e.g., procedure cannot be deleted due to dependencies.',
  })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.proceduresService.remove(uuid);
  }
}
