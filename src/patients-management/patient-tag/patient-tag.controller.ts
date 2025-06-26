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
import { PatientTagService } from './patient-tag.service';
import { CreatePatientTagDto } from './dto/create-patient-tag.dto';
import { UpdatePatientTagDto } from './dto/update-patient-tag.dto';
import { PatientTag } from './entities/patient-tag.entity'; // Importa la entidad

@ApiTags('patient-tags')
@Controller('patient-tags')
export class PatientTagController {
  constructor(private readonly patientTagService: PatientTagService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea una nueva etiqueta de paciente' })
  @ApiBody({ type: CreatePatientTagDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: PatientTag })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  create(@Body() createPatientTagDto: CreatePatientTagDto) {
    return this.patientTagService.create(createPatientTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las etiquetas de paciente' })
  @ApiResponse({ status: HttpStatus.OK, type: [PatientTag] })
  findAll() {
    return this.patientTagService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una etiqueta de paciente por su ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: PatientTag })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Etiqueta de paciente no encontrada.',
  })
  findOne(@Param('id') id: string) {
    return this.patientTagService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza una etiqueta de paciente existente' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdatePatientTagDto })
  @ApiResponse({ status: HttpStatus.OK, type: PatientTag })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Etiqueta de paciente no encontrada.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePatientTagDto: UpdatePatientTagDto,
  ) {
    return this.patientTagService.update(id, updatePatientTagDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Elimina una etiqueta de paciente por su ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Etiqueta de paciente no encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.patientTagService.remove(id);
  }
}
