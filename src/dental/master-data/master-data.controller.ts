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
import { MasterDataService } from './master-data.service';
import { CreateFindingTypeDefinitionDto } from './dto/create-finding-type-definition.dto';
import { UpdateFindingTypeDefinitionDto } from './dto/update-finding-type-definition.dto';
import { CreateDentalSurfaceTypeDefinitionDto } from './dto/create-dental-surface-type-definition.dto';
import { UpdateDentalSurfaceTypeDefinitionDto } from './dto/update-dental-surface-type-definition.dto';
import { CreateCariesDetailDefinitionDto } from './dto/create-caries-detail-definition.dto';
import { UpdateCariesDetailDefinitionDto } from './dto/update-caries-detail-definition.dto';
import { FindingTypeDefinition } from './entities/finding-type-definition.entity';
import { DentalSurfaceTypeDefinition } from './entities/dental-surface-type-definition.entity';
import { CariesDetailDefinition } from './entities/caries-detail-definition.entity';

@ApiTags('Master Data')
@Controller('master-data')
export class MasterDataController {
  constructor(private readonly masterDataService: MasterDataService) {}

  @Post('finding-type-definition')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new finding type definition' })
  @ApiBody({ type: CreateFindingTypeDefinitionDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: FindingTypeDefinition })
  createFindingTypeDefinition(
    @Body() dto: CreateFindingTypeDefinitionDto,
  ): Promise<FindingTypeDefinition> {
    return this.masterDataService.createFindingTypeDefinition(dto);
  }

  @Get('finding-type-definition')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all finding type definitions' })
  @ApiResponse({ status: HttpStatus.OK, type: [FindingTypeDefinition] })
  findAllFindingTypeDefinitions(): Promise<FindingTypeDefinition[]> {
    return this.masterDataService.findAllFindingTypeDefinitions();
  }

  @Get('finding-type-definition/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a finding type definition by UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: FindingTypeDefinition })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Finding type definition not found.',
  })
  findOneFindingTypeDefinition(
    @Param('uuid') uuid: string,
  ): Promise<FindingTypeDefinition> {
    return this.masterDataService.findOneFindingTypeDefinition(uuid);
  }

  @Patch('finding-type-definition/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a finding type definition by UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateFindingTypeDefinitionDto })
  @ApiResponse({ status: HttpStatus.OK, type: FindingTypeDefinition })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Finding type definition not found.',
  })
  updateFindingTypeDefinition(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateFindingTypeDefinitionDto,
  ): Promise<FindingTypeDefinition> {
    return this.masterDataService.updateFindingTypeDefinition(uuid, dto);
  }

  @Delete('finding-type-definition/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a finding type definition by UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Finding type definition not found or already deleted.',
  })
  removeFindingTypeDefinition(@Param('uuid') uuid: string): Promise<void> {
    return this.masterDataService.removeFindingTypeDefinition(uuid);
  }

  @Post('dental-surface-type-definition')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new dental surface type definition' })
  @ApiBody({ type: CreateDentalSurfaceTypeDefinitionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DentalSurfaceTypeDefinition,
  })
  createDentalSurfaceTypeDefinition(
    @Body() dto: CreateDentalSurfaceTypeDefinitionDto,
  ): Promise<DentalSurfaceTypeDefinition> {
    return this.masterDataService.createDentalSurfaceTypeDefinition(dto);
  }

  @Get('dental-surface-type-definition')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all dental surface type definitions' })
  @ApiResponse({ status: HttpStatus.OK, type: [DentalSurfaceTypeDefinition] })
  findAllDentalSurfaceTypeDefinitions(): Promise<
    DentalSurfaceTypeDefinition[]
  > {
    return this.masterDataService.findAllDentalSurfaceTypeDefinitions();
  }

  @Get('dental-surface-type-definition/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve a dental surface type definition by UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: DentalSurfaceTypeDefinition })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental surface type definition not found.',
  })
  findOneDentalSurfaceTypeDefinition(
    @Param('uuid') uuid: string,
  ): Promise<DentalSurfaceTypeDefinition> {
    return this.masterDataService.findOneDentalSurfaceTypeDefinition(uuid);
  }

  @Patch('dental-surface-type-definition/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a dental surface type definition by UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateDentalSurfaceTypeDefinitionDto })
  @ApiResponse({ status: HttpStatus.OK, type: DentalSurfaceTypeDefinition })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental surface type definition not found.',
  })
  updateDentalSurfaceTypeDefinition(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateDentalSurfaceTypeDefinitionDto,
  ): Promise<DentalSurfaceTypeDefinition> {
    return this.masterDataService.updateDentalSurfaceTypeDefinition(uuid, dto);
  }

  @Delete('dental-surface-type-definition/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Soft delete a dental surface type definition by UUID',
  })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dental surface type definition not found or already deleted.',
  })
  removeDentalSurfaceTypeDefinition(
    @Param('uuid') uuid: string,
  ): Promise<void> {
    return this.masterDataService.removeDentalSurfaceTypeDefinition(uuid);
  }
  @Post('caries-detail-definition')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new caries detail definition' })
  @ApiBody({ type: CreateCariesDetailDefinitionDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: CariesDetailDefinition })
  createCariesDetailDefinition(
    @Body() dto: CreateCariesDetailDefinitionDto,
  ): Promise<CariesDetailDefinition> {
    return this.masterDataService.createCariesDetailDefinition(dto);
  }

  @Get('caries-detail-definition')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all caries detail definitions' })
  @ApiResponse({ status: HttpStatus.OK, type: [CariesDetailDefinition] })
  findAllCariesDetailDefinitions(): Promise<CariesDetailDefinition[]> {
    return this.masterDataService.findAllCariesDetailDefinitions();
  }

  @Get('caries-detail-definition/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a caries detail definition by UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.OK, type: CariesDetailDefinition })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Caries detail definition not found.',
  })
  findOneCariesDetailDefinition(
    @Param('uuid') uuid: string,
  ): Promise<CariesDetailDefinition> {
    return this.masterDataService.findOneCariesDetailDefinition(uuid);
  }

  @Patch('caries-detail-definition/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a caries detail definition by UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiBody({ type: UpdateCariesDetailDefinitionDto })
  @ApiResponse({ status: HttpStatus.OK, type: CariesDetailDefinition })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Caries detail definition not found.',
  })
  updateCariesDetailDefinition(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateCariesDetailDefinitionDto,
  ): Promise<CariesDetailDefinition> {
    return this.masterDataService.updateCariesDetailDefinition(uuid, dto);
  }

  @Delete('caries-detail-definition/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a caries detail definition by UUID' })
  @ApiParam({ name: 'uuid', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Caries detail definition not found or already deleted.',
  })
  removeCariesDetailDefinition(@Param('uuid') uuid: string): Promise<void> {
    return this.masterDataService.removeCariesDetailDefinition(uuid);
  }
}
