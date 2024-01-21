import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import {
  CarAnnualSummaryDto,
  CarGroupedByLocationResult,
  CarPaginationResult,
  CreateCarDto,
  FindCarsByIdsDto,
  FindCarsDto,
  FindCarsGroupedByLocationDto,
  SummedValueByYearRequestDto,
} from './cars.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarEntity } from './cars.entity';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cars',
    type: CarPaginationResult,
  })
  async findCars(@Query() query: FindCarsDto): Promise<CarPaginationResult> {
    return this.carsService.findCars(query);
  }

  @Get('/details')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cars',
    type: CarPaginationResult,
  })
  async findCarsByIds(
    @Query() query: FindCarsByIdsDto,
  ): Promise<CarPaginationResult> {
    return this.carsService.findCarsByIds(query);
  }

  @Get('/group/location')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cars grouped by location',
    type: CarGroupedByLocationResult,
  })
  findCarsGroupedByLocation(
    @Query() query: FindCarsGroupedByLocationDto,
  ): Promise<CarGroupedByLocationResult> {
    return this.carsService.findAllByGroup(query);
  }

  @Get('/values/annual-summary')
  @ApiResponse({
    status: 200,
    description: 'Successfully created car',
    type: CarAnnualSummaryDto,
    isArray: true,
  })
  getSummedValueByYear(
    @Query() query: SummedValueByYearRequestDto,
  ): Promise<CarAnnualSummaryDto[]> {
    return this.carsService.getSummedValueByYear(query);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Successfully created car',
    type: CarEntity,
  })
  async createCar(@Body() body: CreateCarDto): Promise<CarEntity> {
    return this.carsService.create(body);
  }
}
