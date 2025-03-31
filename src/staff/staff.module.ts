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

@Module({
  controllers: [PersonController, SpecialistController, SpecialtyController],
  providers: [PersonService, SpecialistService, SpecialtyService],
  imports: [
    TypeOrmModule.forFeature([Person, Specialty]),
    RouterModule.register([
      {
        path: 'staff',
        module: StaffModule,
      },
    ]),
  ],
})
export class StaffModule {}
