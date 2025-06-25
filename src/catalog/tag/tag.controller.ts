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
import { EtiquetaService } from './tag.service';
import { CreateEtiquetaDto } from './dto/create-tag.dto';
import { UpdateEtiquetaDto } from './dto/update-tag.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Catalog - Tags')
@Controller('catalog/tags')
export class EtiquetaController {
  constructor(private readonly etiquetaService: EtiquetaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva etiqueta' })
  @ApiResponse({
    status: 201,
    description: 'La etiqueta ha sido creada exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createEtiquetaDto: CreateEtiquetaDto) {
    return this.etiquetaService.create(createEtiquetaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las etiquetas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de etiquetas obtenida exitosamente.',
  })
  findAll() {
    return this.etiquetaService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una etiqueta por UUID' })
  @ApiResponse({ status: 200, description: 'Etiqueta obtenida exitosamente.' })
  @ApiResponse({ status: 404, description: 'Etiqueta no encontrada.' })
  findOne(@Param('uuid') uuid: string) {
    return this.etiquetaService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una etiqueta existente por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Etiqueta actualizada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Etiqueta no encontrada.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  update(
    @Param('uuid') uuid: string,
    @Body() updateEtiquetaDto: UpdateEtiquetaDto,
  ) {
    return this.etiquetaService.update(uuid, updateEtiquetaDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una etiqueta por UUID (soft delete)' })
  @ApiResponse({ status: 204, description: 'Etiqueta eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Etiqueta no encontrada.' })
  remove(@Param('uuid') uuid: string) {
    return this.etiquetaService.remove(uuid);
  }
}
