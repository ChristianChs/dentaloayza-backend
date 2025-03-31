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
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }
  @Get()
  findAll() {
    return this.personService.findAll();
  }
  @Get('/:uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.personService.findOne(uuid);
  }
  @Patch('/:uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.update(uuid, updatePersonDto);
  }
  @Delete('/:uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.personService.remove(uuid);
  }
}
