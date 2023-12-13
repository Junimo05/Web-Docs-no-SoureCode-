import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  start_date: Date;

  @IsString()
  @IsNotEmpty()
  end_date: Date;

  
  min_spend: number;

  
  max_spend: number;

  @IsNumber()
  @IsNotEmpty()
  uses_per_customer: number;

  @IsNumber()
  @IsNotEmpty()
  uses_per_coupon: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
