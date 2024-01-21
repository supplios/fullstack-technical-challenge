import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { CarController } from './car/controllers/car.controller';
import { GetCarFiltersController } from './car/controllers/car-filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CarEntity } from './car/models/car.entity';
import { CarService } from './car/services/car.service';
import { CarFiltersService } from './car/services/car.filters.service';

@Module({
  imports: [
    CarModule,
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
  controllers: [CarController, GetCarFiltersController],
  providers: [CarService, CarFiltersService, ConfigService],
})
export class AppModule {}
