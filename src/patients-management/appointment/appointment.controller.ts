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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea una nueva cita' })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: Appointment })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las citas' })
  @ApiResponse({ status: HttpStatus.OK, type: [Appointment] })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una cita por su ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Appointment })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cita no encontrada.',
  })
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una cita existente' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({ status: HttpStatus.OK, type: Appointment })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cita no encontrada.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Elimina una cita por su ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cita no encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
