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
import { AntecedentDetailService } from './antecedent-detail.service';
import { CreateAntecedentDetailDto } from './dto/create-antecedent-detail.dto';
import { UpdateAntecedentDetailDto } from './dto/update-antecedent-detail.dto';

@Controller('antecedent-details')
export class AntecedentDetailController {
  constructor(
    private readonly antecedentDetailService: AntecedentDetailService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAntecedentDetailDto: CreateAntecedentDetailDto) {
    return this.antecedentDetailService.create(createAntecedentDetailDto);
  }

  @Get()
  findAll() {
    return this.antecedentDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedentDetailService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAntecedentDetailDto: UpdateAntecedentDetailDto,
  ) {
    return this.antecedentDetailService.update(id, updateAntecedentDetailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.antecedentDetailService.remove(id);
  }
}
