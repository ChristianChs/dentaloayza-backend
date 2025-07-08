import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Odontogram2Service } from './odontogram2.service';
import { CreateOdontogramDto2 } from './dto/create-odontogram2.dto';
import { UpdateOdontogramDto2 } from './dto/update-odontogram2.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('odontogram-view2')
export class Odontogram2Controller {
  constructor(private readonly odontogramService: Odontogram2Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOdontogramDto2) {
    return this.odontogramService.create(dto);
  }

  @Get()
  findAll() {
    return this.odontogramService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un odontograma por su ID' })
  @ApiParam({ name: 'id', description: 'UUID del odontograma' })
  @ApiResponse({ status: 200, description: 'Odontograma encontrado' })
  @ApiResponse({ status: 404, description: 'Odontograma no encontrado' })
  findOne(@Param('id') id: string) {
    return this.odontogramService.findOneById(id);
  }

  @Get('patient/:patientId/latest')
  findLatestByPatient(@Param('patientId') patientId: string) {
    return this.odontogramService.findLatestByPatient(patientId);
  }
  @Get('patient/:patientId/all')
  findAllByPatient(@Param('patientId') patientId: string) {
    return this.odontogramService.findAllByPatient(patientId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOdontogramDto2) {
    return this.odontogramService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.odontogramService.remove(id);
  }
}
