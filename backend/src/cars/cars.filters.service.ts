import { Injectable } from '@nestjs/common';
import {
  GetCarsFiltersRequestDto,
  carFiltersOptionsDto,
} from './cars-filters.dto';

@Injectable()
export class CarsFiltersService {
  constructor() {}

  async get(params: GetCarsFiltersRequestDto) {
    console.log('TEMP', params);
    // const promises: Promise<carFiltersOptionsDto>[] = [];

    // if (params.price) {
    //   promises.push();
    // }

    // if (params.brand) {
    //   promises.push();
    // }

    // if (params.color) {
    //   promises.push();
    // }

    // const [distinctPrices, distinctBrands, distinctColors] =
    //   await Promise.all(promises);

    return new carFiltersOptionsDto();
  }
}
