import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffModule } from './staff/staff.module';
import { PatientsManagementModule } from './patients-management/patients-management.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    StaffModule,
    PatientsManagementModule,
    CatalogModule,
  ],
})
export class AppModule {}
