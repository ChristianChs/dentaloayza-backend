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
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}
  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }
  @Get('/:uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.specialtyService.findOne(uuid);
  }
  @Patch('/:uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(uuid, updateSpecialtyDto);
  }
  @Delete('/:uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.specialtyService.remove(uuid);
  }
}
