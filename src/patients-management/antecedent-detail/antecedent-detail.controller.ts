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
import { AntecedentDetailService } from './antecedent-detail.service';
import { CreateAntecedentDetailDto } from './dto/create-antecedent-detail.dto';
import { UpdateAntecedentDetailDto } from './dto/update-antecedent-detail.dto';
import { AntecedentDetail } from './entities/antecedent-detail.entity';

@ApiTags('antecedent-details')
@Controller('antecedent-details')
export class AntecedentDetailController {
  constructor(
    private readonly antecedentDetailService: AntecedentDetailService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea un nuevo detalle de antecedente' })
  @ApiBody({
    type: CreateAntecedentDetailDto,
    description: 'Datos para crear un nuevo detalle de antecedente',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El detalle de antecedente ha sido creado exitosamente.',
    type: AntecedentDetail,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  create(@Body() createAntecedentDetailDto: CreateAntecedentDetailDto) {
    return this.antecedentDetailService.create(createAntecedentDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los detalles de antecedentes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de todos los detalles de antecedentes.',
    type: [AntecedentDetail],
  })
  findAll() {
    return this.antecedentDetailService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un detalle de antecedente por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del detalle del antecedente',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de antecedente encontrado.',
    type: AntecedentDetail,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Detalle de antecedente no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.antecedentDetailService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un detalle de antecedente existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del detalle del antecedente a actualizar',
    type: 'string',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateAntecedentDetailDto,
    description: 'Datos para actualizar el detalle del antecedente',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'El detalle de antecedente ha sido actualizado exitosamente.',
    type: AntecedentDetail,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Detalle de antecedente no encontrado.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos.',
  })
  update(
    @Param('id') id: string,
    @Body() updateAntecedentDetailDto: UpdateAntecedentDetailDto,
  ) {
    return this.antecedentDetailService.update(id, updateAntecedentDetailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Elimina un detalle de antecedente por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del detalle del antecedente a eliminar',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'El detalle de antecedente ha sido eliminado exitosamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Detalle de antecedente no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.antecedentDetailService.remove(id);
  }
}
