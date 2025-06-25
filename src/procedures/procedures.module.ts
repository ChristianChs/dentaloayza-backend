import { Module } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { ProceduresController } from './procedures.controller';
import { Procedure } from './entities/procedure.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  controllers: [ProceduresController],
  providers: [ProceduresService],
  imports: [TypeOrmModule.forFeature([Procedure])],
  exports: [ProceduresService, TypeOrmModule],
})
export class ProceduresModule {}
