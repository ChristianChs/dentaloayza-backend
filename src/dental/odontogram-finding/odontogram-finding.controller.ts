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
import { OdontogramFindingService } from './odontogram-finding.service';
import { CreateOdontogramFindingDto } from './dto/create-odontogram-finding.dto';
import { UpdateOdontogramFindingDto } from './dto/update-odontogram-finding.dto';
import { OdontogramFinding } from './entities/odontogram-finding.entity';

@ApiTags('Odontogram Findings')
@Controller('odontogram-finding')
export class OdontogramFindingController {
  constructor(
    private readonly odontogramFindingService: OdontogramFindingService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new odontogram finding' })
  @ApiBody({ type: CreateOdontogramFindingDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: OdontogramFinding })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  create(
    @Body() createOdontogramFindingDto: CreateOdontogramFindingDto,
  ): Promise<OdontogramFinding> {
    return this.odontogramFindingService.create(createOdontogramFindingDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all odontogram findings' })
  @ApiResponse({ status: HttpStatus.OK, type: [OdontogramFinding] })
  findAll(): Promise<OdontogramFinding[]> {
    return this.odontogramFindingService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve an odontogram finding by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: OdontogramFinding })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding not found.',
  })
  findOne(@Param('uuid') uuid: string): Promise<OdontogramFinding> {
    return this.odontogramFindingService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update an existing odontogram finding by its UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateOdontogramFindingDto })
  @ApiResponse({ status: HttpStatus.OK, type: OdontogramFinding })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  update(
    @Param('uuid') uuid: string,
    @Body() updateOdontogramFindingDto: UpdateOdontogramFindingDto,
  ): Promise<OdontogramFinding> {
    return this.odontogramFindingService.update(
      uuid,
      updateOdontogramFindingDto,
    );
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete an odontogram finding by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram finding not found or already deleted.',
  })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.odontogramFindingService.remove(uuid);
  }
}
