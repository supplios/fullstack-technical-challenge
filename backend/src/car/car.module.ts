import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './models/car.entity';
import { CarService } from './services/car.service';

@Module({
  providers: [CarService],
  controllers: [CarController],
  imports: [TypeOrmModule.forFeature([CarEntity])],
})
export class CarModule {}
