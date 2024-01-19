import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsFiltersService } from './cars.filters.service';
import {
  GetCarsFiltersRequestDto,
  carFiltersOptionsDto,
} from './cars-filters.dto';

@Controller('cars/filters')
@ApiTags('Cars')
export class GetCarsFiltersController {
  constructor(private readonly carsFiltersService: CarsFiltersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cars',
    type: carFiltersOptionsDto,
    isArray: true,
  })
  async getCarsFilters(
    @Query() query: GetCarsFiltersRequestDto,
  ): Promise<carFiltersOptionsDto> {
    return this.carsFiltersService.get(query);
  }
}
