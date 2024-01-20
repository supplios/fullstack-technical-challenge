import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsFiltersService } from './cars.filters.service';
import { CarFiltersOptionsDto } from './cars-filters.dto';

@Controller('/cars')
@ApiTags('Cars')
export class GetCarsFiltersController {
  constructor(private readonly carsFiltersService: CarsFiltersService) {}

  @Get('/filter-options')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cars',
    type: CarFiltersOptionsDto,
    isArray: true,
  })
  async getCarsFilters(): Promise<CarFiltersOptionsDto> {
    const [brands, colors, prices] = await Promise.all([
      this.carsFiltersService.findDistinctBrands(),
      this.carsFiltersService.findDistinctColors(),
      this.carsFiltersService.findDistinctPrices(),
    ]);

    return {
      brands: brands.map((b) => b.brand),
      colors: colors.map((b) => b.color),
      prices: prices.map((b) => b.price),
    };
  }
}
