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
import { OdontogramService } from './odontogram.service';
import { CreateOdontogramDto } from './dto/create-odontogram.dto';
import { UpdateOdontogramDto } from './dto/update-odontogram.dto';
import { Odontogram } from './entities/odontogram.entity';

@ApiTags('Odontogram')
@Controller('odontogram')
export class OdontogramController {
  constructor(private readonly odontogramService: OdontogramService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new odontogram' })
  @ApiBody({ type: CreateOdontogramDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: Odontogram })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  create(
    @Body() createOdontogramDto: CreateOdontogramDto,
  ): Promise<Odontogram> {
    return this.odontogramService.create(createOdontogramDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all odontograms' })
  @ApiResponse({ status: HttpStatus.OK, type: [Odontogram] })
  findAll(): Promise<Odontogram[]> {
    return this.odontogramService.findAll();
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve an odontogram by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: Odontogram })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram not found.',
  })
  findOne(@Param('uuid') uuid: string): Promise<Odontogram> {
    return this.odontogramService.findOne(uuid);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing odontogram by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateOdontogramDto })
  @ApiResponse({ status: HttpStatus.OK, type: Odontogram })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  update(
    @Param('uuid') uuid: string,
    @Body() updateOdontogramDto: UpdateOdontogramDto,
  ): Promise<Odontogram> {
    return this.odontogramService.update(uuid, updateOdontogramDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete an odontogram by its UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Odontogram not found or already deleted.',
  })
  remove(@Param('uuid') uuid: string): Promise<void> {
    return this.odontogramService.remove(uuid);
  }
}
