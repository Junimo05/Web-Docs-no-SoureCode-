import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderProductDto {
  @IsNumber()
  @IsNotEmpty()
  id_Order: number;

  @IsNumber()
  @IsNotEmpty()
  id_Pro: number;

  
  quantity: number;


  price?: number;
}
