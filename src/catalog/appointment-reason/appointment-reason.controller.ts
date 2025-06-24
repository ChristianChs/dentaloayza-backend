import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MotivoCitaService } from './appointment-reason.service';
import { CreateMotivoCitaDto } from './dto/create-appointment-reason.dto';
import { UpdateMotivoCitaDto } from './dto/update-appointment-reason.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Catalog - Appointment Reasons')
@Controller('catalog/appointment-reasons')
export class MotivoCitaController {
  constructor(private readonly motivoCitaService: MotivoCitaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo motivo de cita' })
  @ApiResponse({
    status: 201,
    description: 'El motivo de cita ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createMotivoCitaDto: CreateMotivoCitaDto) {
    return this.motivoCitaService.create(createMotivoCitaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los motivos de cita' })
  @ApiResponse({
    status: 200,
    description: 'Lista de motivos de cita obtenida exitosamente.',
  })
  findAll() {
    return this.motivoCitaService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un motivo de cita por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Motivo de cita obtenido exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Motivo de cita no encontrado.' })
  findOne(@Param('uuid') uuid: string) {
    return this.motivoCitaService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un motivo de cita existente por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Motivo de cita actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Motivo de cita no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  update(
    @Param('uuid') uuid: string,
    @Body() updateMotivoCitaDto: UpdateMotivoCitaDto,
  ) {
    return this.motivoCitaService.update(uuid, updateMotivoCitaDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un motivo de cita por UUID (soft delete)',
  })
  @ApiResponse({
    status: 204,
    description: 'Motivo de cita eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Motivo de cita no encontrado.' })
  remove(@Param('uuid') uuid: string) {
    return this.motivoCitaService.remove(uuid);
  }
}
