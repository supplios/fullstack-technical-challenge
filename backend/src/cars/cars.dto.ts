import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaginationResult } from 'src/common/pagination.dto';
import { CarEntity } from './cars.entity';

export class CarPaginationResult extends PaginationResult<CarEntity> {
  @ApiProperty({ type: [CarEntity], description: 'Array of car entities' })
  data: CarEntity[];
}

export class FindCarsByIdsDto {
  @ApiProperty({
    type: [Number],
    description: 'An array of IDs',
    required: true,
    example: ['123', '456', '789'],
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((item) => item.trim());
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  ids: number[];

  @ApiProperty({
    required: false,
    description: 'Number of results in each page or request',
    example: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  readonly perPage?: number;

  @ApiProperty({
    required: false,
    description: 'Number of the page',
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  readonly page?: number;
}

export class SummedValueByYearRequestDto {
  @ApiPropertyOptional({ description: 'Filter by car model' })
  @IsOptional()
  @IsString()
  readonly model?: string;

  @ApiPropertyOptional({ description: 'Minimum mileage for filter' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly mileageMin?: number;

  @ApiPropertyOptional({ description: 'Maximum mileage for filter' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly mileageMax?: number;
}

export class FindCarsDto {
  @ApiProperty({
    required: false,
    description: 'The minimum price of the car for the filter range',
    example: '5000',
  })
  @IsOptional()
  @Transform(({ value }) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? undefined : parsed;
  })
  @IsNumber()
  @Min(0)
  readonly priceFrom?: number;

  @ApiProperty({
    required: false,
    description: 'The maximum price of the car for the filter range',
    example: '30000',
  })
  @IsOptional()
  @Transform(({ value }) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? undefined : parsed;
  })
  @IsNumber()
  @Min(0)
  readonly priceTo?: number;

  @ApiProperty({
    required: false,
    description:
      'Filter by multiple car colors, pass each color as a separate query parameter, like `colors=red&colors=blue`',
    type: [String],
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : value ? [value] : [],
  )
  @IsString({ each: true })
  readonly colors?: string[];

  @ApiProperty({
    required: false,
    description:
      'Filter by multiple car brands, pass each brand as a separate query parameter, like `brands=toyota&brands=ford`',
    type: [String],
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : value ? [value] : [],
  )
  @IsString({ each: true })
  readonly brands?: string[];

  @ApiProperty({
    required: false,
    description: 'Number of results in each page or request',
    example: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  readonly perPage?: number;

  @ApiProperty({
    required: false,
    description: 'Number of the page',
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  readonly page?: number;
}

export class CreateCarDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'The price of the car' })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The brand of the car' })
  brand: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The model of the car' })
  model: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @ApiProperty({ description: 'The manufacturing year of the car' })
  year: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The title status of the car' })
  title_status: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'The mileage of the car' })
  mileage: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The color of the car' })
  color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The VIN (Vehicle Identification Number) of the car',
  })
  vin: string;

  @IsInt()
  @ApiProperty({ description: 'The lot number of the car' })
  lot: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The state where the car is located' })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The country where the car is located' })
  country: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The condition of the car' })
  condition: string;
}

export class FindCarsGroupedByLocationDto {
  @ApiProperty({
    required: false,
    description: 'Number of results in each page or request',
    example: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  readonly perPage?: number;

  @ApiProperty({
    required: false,
    description: 'Number of the page',
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  readonly page?: number;
}

export class CarGroupedByLocationDto {
  @ApiProperty({
    example: 'alabama',
    description: 'The state where the car is located',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: 'usa',
    description: 'The country where the car is located',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: [Number],
    example: [1066, 1067, 1350, 1375, 1376],
    description: 'Array of car IDs',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @ApiProperty({
    example: 44,
    description: 'Count of cars in the each group',
  })
  @IsNumber()
  count: number;
}

export class CarGroupedByLocationResult extends PaginationResult<CarGroupedByLocationDto> {
  @ApiProperty({
    type: [CarGroupedByLocationDto],
    description: 'Array of cars grouped by location',
  })
  data: CarGroupedByLocationDto[];
}

export class CarAnnualSummaryDto {
  @ApiProperty({
    example: 2000,
    description: 'The year of the car summary',
  })
  year: number;

  @ApiProperty({
    type: [Number],
    description: 'Array of car IDs',
    example: [189, 286, 392, 422],
  })
  ids: number[];

  @ApiProperty({
    example: 175,
    description: 'Total value for the year',
  })
  total: number;
}
