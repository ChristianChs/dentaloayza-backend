import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { DentalStatusService } from './dental-status.service';
import { CreateDentalStatusDto } from './dto/create-dental-status.dto';
import { UpdateDentalStatusDto } from './dto/update-dental-status.dto';
import { DentalStatus } from './entities/dental-status.entity';

@ApiTags('Dental Status')
@Controller('dental-status')
export class DentalStatusController {
  constructor(private readonly dentalStatusService: DentalStatusService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new dental status' })
  @ApiBody({ type: CreateDentalStatusDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: DentalStatus })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  create(
    @Body() createDentalStatusDto: CreateDentalStatusDto,
  ): Promise<DentalStatus> {
    return this.dentalStatusService.create(createDentalStatusDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all dental statuses' })
  @ApiResponse({ status: HttpStatus.OK, type: [DentalStatus] })
  findAll(): Promise<DentalStatus[]> {
    return this.dentalStatusService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a dental status by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DentalStatus })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental status not found.',
  })
  findOne(@Param('uuid') uuid: string): Promise<DentalStatus> {
    return this.dentalStatusService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing dental status by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateDentalStatusDto })
  @ApiResponse({ status: HttpStatus.OK, type: DentalStatus })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental status not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  update(
    @Param('uuid') uuid: string,
    @Body() updateDentalStatusDto: UpdateDentalStatusDto,
  ): Promise<DentalStatus> {
    return this.dentalStatusService.update(uuid, updateDentalStatusDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a dental status by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental status not found or already deleted.',
  })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.dentalStatusService.remove(uuid);
  }
}
