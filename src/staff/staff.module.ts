import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { SpecialistController } from './specialist/specialist.controller';
import { SpecialistService } from './specialist/specialist.service';
import { SpecialtyService } from './specialty/specialty.service';
import { SpecialtyController } from './specialty/specialty.controller';
import { Person } from './person/entities/person.entity';
import { Specialty } from './specialty/entities/specialty.entity';
import { Specialist } from './specialist/entities/specialist.entity';

@Module({
  controllers: [PersonController, SpecialistController, SpecialtyController],
  providers: [PersonService, SpecialistService, SpecialtyService],
  imports: [
    TypeOrmModule.forFeature([Person, Specialty, Specialist]),
    RouterModule.register([
      {
        path: 'staff',
        module: StaffModule,
      },
    ]),
  ],
  exports: [PersonService, SpecialistService, TypeOrmModule],
})
export class StaffModule {}
