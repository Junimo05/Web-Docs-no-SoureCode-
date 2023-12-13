import { IsNotEmpty, IsNumber } from 'class-validator';

export class Cart_Item_Dto {
  @IsNumber()
  @IsNotEmpty()
  id_Cart: number;

  @IsNumber()
  @IsNotEmpty()
  id_Pro: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
