import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarFiltersOptionsDto } from '../models/car-filters.dto';
import { CarFiltersService } from '../services/car.filters.service';

@Controller('/cars')
@ApiTags('Cars')
export class GetCarFiltersController {
  constructor(private readonly carFiltersService: CarFiltersService) {}

  @Get('/filter-options')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cars',
    type: CarFiltersOptionsDto,
    isArray: true,
  })
  async getCarFilters(): Promise<CarFiltersOptionsDto> {
    const [brands, colors, prices] = await Promise.all([
      this.carFiltersService.findDistinctBrands(),
      this.carFiltersService.findDistinctColors(),
      this.carFiltersService.findDistinctPrices(),
    ]);

    return {
      brands: brands.map((b) => b.brand),
      colors: colors.map((b) => b.color),
      prices: prices.map((b) => b.price),
    };
  }
}
