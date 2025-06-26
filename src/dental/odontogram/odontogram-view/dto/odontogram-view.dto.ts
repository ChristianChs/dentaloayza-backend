import { ApiProperty } from '@nestjs/swagger';

class FindingDetailDto {
  @ApiProperty()
  abreviatura: string;

  @ApiProperty()
  nombre: string;
}

class CaraDetailDto {
  @ApiProperty()
  tipo: string;

  @ApiProperty()
  abreviatura: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ type: FindingDetailDto, nullable: true })
  detalle?: FindingDetailDto;
}

class OdontogramFindingOutputDto {
  @ApiProperty()
  tipo: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  abreviatura: string;

  @ApiProperty({ type: [FindingDetailDto], nullable: true })
  detalle?: FindingDetailDto[];

  @ApiProperty({ nullable: true })
  direccion?: string;

  @ApiProperty({
    type: () => ({}),
    nullable: true,
    description: 'Estructura de la cara específica del hallazgo',
  })
  cara?: { [key: string]: CaraDetailDto };
}

class OdontogramServiceOutputDto {
  @ApiProperty()
  tipo: string;
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  precio: number;
}

export class OdontogramDetailedOutputDto {
  @ApiProperty({
    oneOf: [{ type: 'number' }, { type: 'array', items: { type: 'number' } }],
  })
  diente: number | number[];

  @ApiProperty({ type: OdontogramFindingOutputDto })
  hallazgo: OdontogramFindingOutputDto;

  @ApiProperty()
  nota: string;

  @ApiProperty({ type: [OdontogramServiceOutputDto] })
  servicios: OdontogramServiceOutputDto[];
}
