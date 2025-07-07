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
import { AntecedentPatientService } from './antecedent-patient.service';
import { CreateFullAntecedentPatientDto } from './dto/create-antecedent-patient.dto';
import { UpdateAntecedentPatientDto } from './dto/update-antecedent-patient.dto';
import { AntecedentPatient } from './entities/antecedent-patient.entity';

@ApiTags('antecedent-patients')
@Controller('antecedent-patients')
export class AntecedentPatientController {
  constructor(
    private readonly antecedentPatientService: AntecedentPatientService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea una nueva relación antecedente-paciente' })
  @ApiBody({ type: CreateFullAntecedentPatientDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: AntecedentPatient })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  create(@Body() createAntecedentPatientDto: CreateFullAntecedentPatientDto) {
    return this.antecedentPatientService.create(createAntecedentPatientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todas las relaciones antecedente-paciente',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [AntecedentPatient] })
  findAll() {
    return this.antecedentPatientService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una relación antecedente-paciente por su ID',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: AntecedentPatient })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Relación antecedente-paciente no encontrada.',
  })
  findOne(@Param('id') id: string) {
    return this.antecedentPatientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza una relación antecedente-paciente existente',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAntecedentPatientDto })
  @ApiResponse({ status: HttpStatus.OK, type: AntecedentPatient })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Relación antecedente-paciente no encontrada.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  update(
    @Param('id') id: string,
    @Body() updateAntecedentPatientDto: UpdateAntecedentPatientDto,
  ) {
    return this.antecedentPatientService.update(id, updateAntecedentPatientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Elimina una relación antecedente-paciente por su ID',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Relación antecedente-paciente no encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.antecedentPatientService.remove(id);
  }
}
