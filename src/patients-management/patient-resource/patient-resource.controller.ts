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
import { PatientResourceService } from './patient-resource.service';
import { CreatePatientResourceDto } from './dto/create-patient-resource.dto';
import { UpdatePatientResourceDto } from './dto/update-patient-resource.dto';
import { PatientResource } from './entities/patient-resource.entity';

@ApiTags('patient-resources')
@Controller('patient-resources')
export class PatientResourceController {
  constructor(
    private readonly patientResourceService: PatientResourceService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea un nuevo recurso de paciente' })
  @ApiBody({ type: CreatePatientResourceDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: PatientResource })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  create(@Body() createPatientResourceDto: CreatePatientResourceDto) {
    return this.patientResourceService.create(createPatientResourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los recursos de paciente' })
  @ApiResponse({ status: HttpStatus.OK, type: [PatientResource] })
  findAll() {
    return this.patientResourceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un recurso de paciente por su ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: PatientResource })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurso de paciente no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.patientResourceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un recurso de paciente existente' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdatePatientResourceDto })
  @ApiResponse({ status: HttpStatus.OK, type: PatientResource })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurso de paciente no encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePatientResourceDto: UpdatePatientResourceDto,
  ) {
    return this.patientResourceService.update(id, updatePatientResourceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Elimina un recurso de paciente por su ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurso de paciente no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.patientResourceService.remove(id);
  }
}
