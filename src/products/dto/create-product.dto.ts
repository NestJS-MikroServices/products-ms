import { IsInt, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  @Length(10, 20)
  public name: string;
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(10)
  public price: string;
}
