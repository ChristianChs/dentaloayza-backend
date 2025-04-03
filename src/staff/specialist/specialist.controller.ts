import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';

@Controller('specialist')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Post()
  create(@Body() createSpecialistDto: CreateSpecialistDto) {
    return this.specialistService.create(createSpecialistDto);
  }

  @Get()
  findAll() {
    return this.specialistService.findAll();
  }

  @Get('/:uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.specialistService.findOne(uuid);
  }

  @Patch('/:uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto,
  ) {
    return this.specialistService.update(uuid, updateSpecialistDto);
  }

  @Delete('/:uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.specialistService.remove(uuid);
  }
}
