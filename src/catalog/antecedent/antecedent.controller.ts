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
import { AntecedenteService } from './antecedent.service';
import { CreateAntecedenteDto } from './dto/create-antecedent.dto';
import { UpdateAntecedenteDto } from './dto/update-antecedent.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Catalog - Antecedents')
@Controller('catalog/antecedents')
export class AntecedenteController {
  constructor(private readonly antecedenteService: AntecedenteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo antecedente' })
  @ApiResponse({
    status: 201,
    description: 'El antecedente ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createAntecedenteDto: CreateAntecedenteDto) {
    return this.antecedenteService.create(createAntecedenteDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los antecedentes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de antecedentes obtenida exitosamente.',
  })
  findAll() {
    return this.antecedenteService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un antecedente por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Antecedente obtenido exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Antecedente no encontrado.' })
  findOne(@Param('uuid') uuid: string) {
    return this.antecedenteService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un antecedente existente por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Antecedente actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Antecedente no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  update(
    @Param('uuid') uuid: string,
    @Body() updateAntecedenteDto: UpdateAntecedenteDto,
  ) {
    return this.antecedenteService.update(uuid, updateAntecedenteDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un antecedente por UUID (soft delete)' })
  @ApiResponse({
    status: 204,
    description: 'Antecedente eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Antecedente no encontrado.' })
  remove(@Param('uuid') uuid: string) {
    return this.antecedenteService.remove(uuid);
  }
}
