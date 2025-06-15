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
import { PatientResourceService } from './patient-resource.service';
import { CreatePatientResourceDto } from './dto/create-patient-resource.dto';
import { UpdatePatientResourceDto } from './dto/update-patient-resource.dto';

@Controller('patient-resources')
export class PatientResourceController {
  constructor(
    private readonly patientResourceService: PatientResourceService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPatientResourceDto: CreatePatientResourceDto) {
    return this.patientResourceService.create(createPatientResourceDto);
  }

  @Get()
  findAll() {
    return this.patientResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientResourceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientResourceDto: UpdatePatientResourceDto,
  ) {
    return this.patientResourceService.update(id, updatePatientResourceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.patientResourceService.remove(id);
  }
}
