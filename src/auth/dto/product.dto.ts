import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsNotEmpty()
  id_Cate: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  image_Pro?: string;
  
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  sold?: number;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  feature?: boolean;
}
