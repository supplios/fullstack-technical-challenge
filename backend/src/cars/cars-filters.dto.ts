import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class GetCarsFiltersRequestDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly isPrice: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly isColor: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly isBrand: boolean;
}

export class carFiltersOptionsDto {
  @ApiProperty({ type: [Number], example: [1000, 2000, 3000] })
  prices: number[];

  @ApiProperty({ type: [String], example: ['Red', 'Blue', 'Black'] })
  colors: string[];

  @ApiProperty({ type: [String], example: ['Toyota', 'Ford', 'Honda'] })
  brands: string[];
}
