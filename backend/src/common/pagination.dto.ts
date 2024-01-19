import { ApiProperty } from '@nestjs/swagger';

export class PaginationResult<T> {
  @ApiProperty({ isArray: true, description: 'Array of data items' })
  data: T[];

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  perPage: number;

  constructor(data: T[], total: number, page: number, perPage: number) {
    this.data = data;
    this.total = total;
    this.totalPages = Math.ceil(total / perPage);
    this.page = page;
    this.perPage = perPage;
  }
}
