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
import { OdontogramFindingServiceService } from './odontogram-finding-service.service';
import { CreateOdontogramFindingServiceDto } from './dto/create-odontogram-finding-service.dto';
import { UpdateOdontogramFindingServiceDto } from './dto/update-odontogram-finding-service.dto';
import { OdontogramFindingServiceEntity } from './entities/odontogram-finding-service.entity';

@ApiTags('Odontogram Finding Services')
@Controller('odontogram-finding-service')
export class OdontogramFindingServiceController {
  constructor(
    private readonly odontogramFindingServiceService: OdontogramFindingServiceService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new odontogram finding service' })
  @ApiBody({ type: CreateOdontogramFindingServiceDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: OdontogramFindingServiceEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  create(
    @Body()
    createOdontogramFindingServiceDto: CreateOdontogramFindingServiceDto,
  ): Promise<OdontogramFindingServiceEntity> {
    return this.odontogramFindingServiceService.create(
      createOdontogramFindingServiceDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all odontogram finding services' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OdontogramFindingServiceEntity],
  })
  findAll(): Promise<OdontogramFindingServiceEntity[]> {
    return this.odontogramFindingServiceService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve an odontogram finding service by its UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: OdontogramFindingServiceEntity })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding service not found.',
  })
  findOne(
    @Param('uuid') uuid: string,
  ): Promise<OdontogramFindingServiceEntity> {
    return this.odontogramFindingServiceService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update an existing odontogram finding service by its UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateOdontogramFindingServiceDto })
  @ApiResponse({ status: HttpStatus.OK, type: OdontogramFindingServiceEntity })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding service not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  update(
    @Param('uuid') uuid: string,
    @Body()
    updateOdontogramFindingServiceDto: UpdateOdontogramFindingServiceDto,
  ): Promise<OdontogramFindingServiceEntity> {
    return this.odontogramFindingServiceService.update(
      uuid,
      updateOdontogramFindingServiceDto,
    );
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Soft delete an odontogram finding service by its UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding service not found or already deleted.',
  })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.odontogramFindingServiceService.remove(uuid);
  }
}
