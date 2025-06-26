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
import { OdontogramFindingSurfaceService } from './odontogram-finding-surface.service';
import { CreateOdontogramFindingSurfaceDto } from './dto/create-odontogram-finding-surface.dto';
import { UpdateOdontogramFindingSurfaceDto } from './dto/update-odontogram-finding-surface.dto';
import { OdontogramFindingSurface } from './entities/odontogram-finding-surface.entity';

@ApiTags('Odontogram Finding Surfaces')
@Controller('odontogram-finding-surface')
export class OdontogramFindingSurfaceController {
  constructor(
    private readonly odontogramFindingSurfaceService: OdontogramFindingSurfaceService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new odontogram finding surface' })
  @ApiBody({ type: CreateOdontogramFindingSurfaceDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: OdontogramFindingSurface })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  create(
    @Body()
    createOdontogramFindingSurfaceDto: CreateOdontogramFindingSurfaceDto,
  ): Promise<OdontogramFindingSurface> {
    return this.odontogramFindingSurfaceService.create(
      createOdontogramFindingSurfaceDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all odontogram finding surfaces' })
  @ApiResponse({ status: HttpStatus.OK, type: [OdontogramFindingSurface] })
  findAll(): Promise<OdontogramFindingSurface[]> {
    return this.odontogramFindingSurfaceService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve an odontogram finding surface by its UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: OdontogramFindingSurface })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding surface not found.',
  })
  findOne(@Param('uuid') uuid: string): Promise<OdontogramFindingSurface> {
    return this.odontogramFindingSurfaceService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update an existing odontogram finding surface by its UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateOdontogramFindingSurfaceDto })
  @ApiResponse({ status: HttpStatus.OK, type: OdontogramFindingSurface })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding surface not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  update(
    @Param('uuid') uuid: string,
    @Body()
    updateOdontogramFindingSurfaceDto: UpdateOdontogramFindingSurfaceDto,
  ): Promise<OdontogramFindingSurface> {
    return this.odontogramFindingSurfaceService.update(
      uuid,
      updateOdontogramFindingSurfaceDto,
    );
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Soft delete an odontogram finding surface by its UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding surface not found or already deleted.',
  })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.odontogramFindingSurfaceService.remove(uuid);
  }
}
