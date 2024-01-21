import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CarEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the car' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The price of the car' })
  price: number;

  @Column()
  @ApiProperty({ description: 'The brand of the car' })
  brand: string;

  @Column()
  @ApiProperty({ description: 'The model of the car' })
  model: string;

  @Column()
  @ApiProperty({ description: 'The manufacturing year of the car' })
  year: number;

  @Column()
  @ApiProperty({ description: 'The title status of the car' })
  title_status: string;

  @Column()
  @ApiProperty({ description: 'The mileage of the car' })
  mileage: number;

  @Column()
  @ApiProperty({ description: 'The color of the car' })
  color: string;

  @Column()
  @ApiProperty({
    description: 'The VIN (Vehicle Identification Number) of the car',
  })
  vin: string;

  @Column()
  @ApiProperty({ description: 'The lot number of the car' })
  lot: number;

  @Column()
  @ApiProperty({ description: 'The state where the car is located' })
  state: string;

  @Column()
  @ApiProperty({ description: 'The country where the car is located' })
  country: string;

  @Column()
  @ApiProperty({ description: 'The condition of the car' })
  condition: string;
}
