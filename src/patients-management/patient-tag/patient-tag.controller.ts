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
import { PatientTagService } from './patient-tag.service';
import { CreatePatientTagDto } from './dto/create-patient-tag.dto';
import { UpdatePatientTagDto } from './dto/update-patient-tag.dto';

@Controller('patient-tags')
export class PatientTagController {
  constructor(private readonly patientTagService: PatientTagService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPatientTagDto: CreatePatientTagDto) {
    return this.patientTagService.create(createPatientTagDto);
  }

  @Get()
  findAll() {
    return this.patientTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientTagService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientTagDto: UpdatePatientTagDto,
  ) {
    return this.patientTagService.update(id, updatePatientTagDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.patientTagService.remove(id);
  }
}
