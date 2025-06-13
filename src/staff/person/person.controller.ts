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
import { ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PersonResponseDto } from './dto';
import { ApiAuth } from 'src/common/decorators/api-auth.decorator';

@Controller('person')
@ApiAuth()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of persons',
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 404, description: 'No persons found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll() {
    const persons = this.personService.findAll();
    return plainToInstance(PersonResponseDto, await persons, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/:uuid')
  @ApiResponse({
    status: 200,
    description: 'Returns a person by UUID',
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Person not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const person = this.personService.findOne(uuid);
    return plainToInstance(PersonResponseDto, person, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/:uuid')
  @ApiResponse({
    status: 200,
    description: 'Updates a person by UUID',
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Person not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({
    status: 409,
    description: 'Conflict error, e.g., duplicate numeroDocumento',
  })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    const person = this.personService.update(uuid, updatePersonDto);
    return plainToInstance(PersonResponseDto, person, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('/:uuid')
  @ApiResponse({ status: 200, description: 'Deletes a person by UUID' })
  @ApiResponse({ status: 404, description: 'Person not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({
    status: 409,
    description:
      'Conflict error, e.g., person cannot be deleted due to dependencies',
  })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.personService.remove(uuid);
  }
}
