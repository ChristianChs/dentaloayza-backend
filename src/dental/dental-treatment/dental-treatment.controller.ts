import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
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
import { DentalTreatmentService } from './dental-treatment.service';
import { CreateDentalTreatmentDto } from './dto/create-dental-treatment.dto';
import { UpdateDentalTreatmentDto } from './dto/update-dental-treatment.dto';
import { DentalTreatment } from './entities/dental-treatment.entity';

@ApiTags('Dental Treatment')
@Controller('dental-treatment')
export class DentalTreatmentController {
  constructor(
    private readonly dentalTreatmentService: DentalTreatmentService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new dental treatment' })
  @ApiBody({ type: CreateDentalTreatmentDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: DentalTreatment })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  create(
    @Body() createDentalTreatmentDto: CreateDentalTreatmentDto,
  ): Promise<DentalTreatment> {
    return this.dentalTreatmentService.create(createDentalTreatmentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all dental treatments' })
  @ApiResponse({ status: HttpStatus.OK, type: [DentalTreatment] })
  findAll(): Promise<DentalTreatment[]> {
    return this.dentalTreatmentService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a dental treatment by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DentalTreatment })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental treatment not found.',
  })
  findOne(@Param('uuid') uuid: string): Promise<DentalTreatment> {
    return this.dentalTreatmentService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing dental treatment by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateDentalTreatmentDto })
  @ApiResponse({ status: HttpStatus.OK, type: DentalTreatment })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental treatment not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  update(
    @Param('uuid') uuid: string,
    @Body() updateDentalTreatmentDto: UpdateDentalTreatmentDto,
  ): Promise<DentalTreatment> {
    return this.dentalTreatmentService.update(uuid, updateDentalTreatmentDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a dental treatment by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental treatment not found or already deleted.',
  })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.dentalTreatmentService.remove(uuid);
  }
}
