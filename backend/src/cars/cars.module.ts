import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './cars.entity';

@Module({
  providers: [CarsService],
  controllers: [CarsController],
  imports: [TypeOrmModule.forFeature([CarEntity])],
})
export class CarsModule {}
