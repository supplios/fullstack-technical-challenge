import { Module } from '@nestjs/common';
import { CarsService } from './cars/cars.service';
import { CarsController } from './cars/cars.controller';
import { CarsFiltersService } from './cars/cars.filters.service';
import { GetCarsFiltersController } from './cars/cars-filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarEntity } from './cars/cars.entity';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    CarsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [CarEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([CarEntity]),
  ],
  controllers: [CarsController, GetCarsFiltersController],
  providers: [CarsService, CarsFiltersService, ConfigService],
})
export class AppModule {}
