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
import { plainToInstance } from 'class-transformer';
import { SpecialistResponseDto } from './dto/specialist-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ApiAuth } from 'src/common/decorators/api-auth.decorator';

@Controller('specialist')
@ApiAuth()
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Specialist successfully created.',
    type: SpecialistResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid data provided.',
  })
  @ApiResponse({ status: 404, description: 'Person not found.' })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Specialist already exists.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  create(@Body() createSpecialistDto: CreateSpecialistDto) {
    const specialist = this.specialistService.create(createSpecialistDto);
    return plainToInstance(SpecialistResponseDto, specialist, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of specialists',
    type: SpecialistResponseDto,
  })
  @ApiResponse({ status: 404, description: 'No specialists found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    const specialists = this.specialistService.findAll();
    return plainToInstance(SpecialistResponseDto, specialists, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/:uuid')
  @ApiResponse({
    status: 200,
    description: 'Returns a specialist by UUID',
    type: SpecialistResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Specialist not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const specialist = this.specialistService.findOne(uuid);
    return plainToInstance(SpecialistResponseDto, specialist, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('/:uuid')
  @ApiResponse({
    status: 200,
    description: 'Updates a specialist by UUID',
    type: SpecialistResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Specialist not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto,
  ) {
    const updatedSpecialist = this.specialistService.update(
      uuid,
      updateSpecialistDto,
    );
    return plainToInstance(SpecialistResponseDto, updatedSpecialist, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('/:uuid')
  @ApiResponse({ status: 200, description: 'Deletes a specialist by UUID' })
  @ApiResponse({ status: 404, description: 'Specialist not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({
    status: 409,
    description:
      'Conflict error, e.g., specialist cannot be deleted due to existing references',
  })
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.specialistService.remove(uuid);
  }
}
