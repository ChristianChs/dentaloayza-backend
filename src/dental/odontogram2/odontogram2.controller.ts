import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Odontogram2Service } from './odontogram2.service';
import { CreateOdontogramDto } from './dto/create-odontogram2.dto';
import { UpdateOdontogramDto } from './dto/update-odontogram2.dto';

@Controller('odontogram-view2')
export class Odontogram2Controller {
  constructor(private readonly odontogramService: Odontogram2Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateOdontogramDto) {
    return this.odontogramService.create(dto);
  }

  @Get()
  findAll() {
    return this.odontogramService.findAll();
  }

  @Get('patient/:patientId/detailed')
  findByPatient(@Param('patientId') patientId: string) {
    return this.odontogramService.findLatestByPatient(patientId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOdontogramDto) {
    return this.odontogramService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.odontogramService.remove(id);
  }
}
