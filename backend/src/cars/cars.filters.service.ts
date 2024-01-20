import { Injectable } from '@nestjs/common';
import { CarEntity } from './cars.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarsFiltersService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  findDistinctBrands(): Promise<
    {
      brand: string;
    }[]
  > {
    return this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT(car.brand)', 'brand')
      .orderBy('brand')
      .getRawMany();
  }

  findDistinctColors(): Promise<
    {
      color: string;
    }[]
  > {
    return this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT(car.color)', 'color')
      .orderBy('color')
      .getRawMany();
  }

  findDistinctPrices(): Promise<
    {
      price: number;
    }[]
  > {
    return this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT(car.price)', 'price')
      .orderBy('price')
      .getRawMany();
  }
}
