import { ApiProperty } from '@nestjs/swagger';

export class CarFiltersOptionsDto {
  @ApiProperty({ type: [Number], example: [1000, 2000, 3000] })
  prices: number[];

  @ApiProperty({ type: [String], example: ['Red', 'Blue', 'Black'] })
  colors: string[];

  @ApiProperty({ type: [String], example: ['Toyota', 'Ford', 'Honda'] })
  brands: string[];
}
