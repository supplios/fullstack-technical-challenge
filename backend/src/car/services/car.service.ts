import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { PaginationResult } from 'src/common/pagination.dto';
import { CarEntity } from '../models/car.entity';
import {
  SummedValueByYearRequestDto,
  CarAnnualSummaryDto,
  CarGroupedByLocationDto,
  CreateCarDto,
  FindCarsByIdsDto,
  FindCarsDto,
  FindCarsGroupedByLocationDto,
} from '../models/car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async create(car: CreateCarDto): Promise<CarEntity> {
    const poll = this.carRepository.create(car);
    return this.carRepository.save(poll);
  }

  async findCarsByIds(
    params: FindCarsByIdsDto,
  ): Promise<PaginationResult<CarEntity>> {
    const { page = 1, perPage = 10, ids = [] } = params;
    const queryOptions = {};
    const offset = (page - 1) * perPage;

    console.log(ids);

    queryOptions['id'] = In(ids);

    const [data, total] = await this.carRepository.findAndCount({
      where: queryOptions,
      take: perPage,
      skip: offset,
    });

    return new PaginationResult<CarEntity>(data, total, page, perPage);
  }

  async findCars(
    findCarsDto: FindCarsDto,
  ): Promise<PaginationResult<CarEntity>> {
    const queryOptions = {};

    if (
      findCarsDto.priceFrom !== undefined &&
      findCarsDto.priceTo !== undefined
    ) {
      queryOptions['price'] = Between(
        findCarsDto.priceFrom,
        findCarsDto.priceTo,
      );
    } else if (findCarsDto.priceFrom !== undefined) {
      queryOptions['price'] = MoreThanOrEqual(findCarsDto.priceFrom);
    } else if (findCarsDto.priceTo !== undefined) {
      queryOptions['price'] = LessThanOrEqual(findCarsDto.priceTo);
    }

    if (findCarsDto.colors && findCarsDto.colors.length > 0) {
      queryOptions['color'] = In(findCarsDto.colors);
    }

    if (findCarsDto.brands && findCarsDto.brands.length > 0) {
      queryOptions['brand'] = In(findCarsDto.brands);
    }

    const perPage = findCarsDto.perPage || 10;
    const page = findCarsDto.page || 1;
    const offset = (page - 1) * perPage;

    const [data, total] = await this.carRepository.findAndCount({
      where: queryOptions,
      take: perPage,
      skip: offset,
    });

    return new PaginationResult<CarEntity>(data, total, page, perPage);
  }

  async findAllByGroup(
    query: FindCarsGroupedByLocationDto,
  ): Promise<PaginationResult<CarGroupedByLocationDto>> {
    const { page = 1, perPage = 10 } = query;
    const offset = (page - 1) * perPage;

    const sqlQuery = `
    SELECT state, country, array_agg(id) as ids, 
       COUNT(id) as count
      FROM car_entity
      GROUP BY state, country
      ORDER BY state, country
      LIMIT $1 OFFSET $2;
  `;

    const totalCount = `
      SELECT COUNT(*) FROM (
        SELECT 1 FROM car_entity
        GROUP BY state, country
      ) as unique_groups;
    `;

    const [groupedCars, totalGroup] = await Promise.all([
      this.carRepository.query(sqlQuery, [perPage, offset]),
      this.carRepository.query(totalCount),
    ]);

    const total = parseInt(totalGroup[0].count, 10);

    return new PaginationResult<CarGroupedByLocationDto>(
      groupedCars,
      total,
      page,
      perPage,
    );
  }

  async getSummedValueByYear(
    dto: SummedValueByYearRequestDto,
  ): Promise<CarAnnualSummaryDto[]> {
    const query = this.carRepository
      .createQueryBuilder('car')
      .select('car.year', 'year')
      .addSelect('ARRAY_AGG(car.id)', 'ids')
      .addSelect('SUM(car.price)', 'total')
      .groupBy('car.year')
      .orderBy('car.year');

    if (dto.model) {
      query.andWhere('car.model = :model', { model: dto.model });
    }
    if (dto.mileageMin) {
      query.andWhere('car.mileage >= :min', { min: dto.mileageMin });
    }
    if (dto.mileageMax) {
      query.andWhere('car.mileage <= :max', { max: dto.mileageMax });
    }

    const result: CarAnnualSummaryDto[] = await query.getRawMany();

    return result;
  }
}
