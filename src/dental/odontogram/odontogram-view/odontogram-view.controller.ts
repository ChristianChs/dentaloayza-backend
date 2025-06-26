import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { OdontogramViewService } from './odontogram-view.service';
import { OdontogramDetailedOutputDto } from './dto/odontogram-view.dto';
import { ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Odontogram View')
@Controller('odontogram-view')
export class OdontogramViewController {
  constructor(private readonly odontogramViewService: OdontogramViewService) {}

  @Get('patient/:idPaciente/detailed')
  @ApiOkResponse({
    description: 'Lista detallada del odontograma de un paciente',
    type: [OdontogramDetailedOutputDto],
  })
  @ApiNotFoundResponse({ description: 'Odontograma o paciente no encontrado.' })
  async getDetailedOdontogramByPatientId(
    @Param('idPaciente', ParseUUIDPipe) idPaciente: string,
  ): Promise<OdontogramDetailedOutputDto[]> {
    return this.odontogramViewService.getDetailedOdontogramForPatient(
      idPaciente,
    );
  }
}
