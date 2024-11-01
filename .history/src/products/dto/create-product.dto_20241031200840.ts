import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  public name: string;
  
  @IsNumber()
  @Min(1)
  @Max(10000)
  @Type(()=>Number)
  public price: number;
}
