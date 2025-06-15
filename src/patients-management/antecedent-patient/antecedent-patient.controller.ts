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
import { AntecedentPatientService } from './antecedent-patient.service';
import { CreateAntecedentPatientDto } from './dto/create-antecedent-patient.dto';
import { UpdateAntecedentPatientDto } from './dto/update-antecedent-patient.dto';

@Controller('antecedent-patients')
export class AntecedentPatientController {
  constructor(
    private readonly antecedentPatientService: AntecedentPatientService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAntecedentPatientDto: CreateAntecedentPatientDto) {
    return this.antecedentPatientService.create(createAntecedentPatientDto);
  }

  @Get()
  findAll() {
    return this.antecedentPatientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedentPatientService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAntecedentPatientDto: UpdateAntecedentPatientDto,
  ) {
    return this.antecedentPatientService.update(id, updateAntecedentPatientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.antecedentPatientService.remove(id);
  }
}
