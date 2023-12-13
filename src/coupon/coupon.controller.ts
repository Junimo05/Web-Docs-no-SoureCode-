import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponDto } from 'src/auth/dto';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Get()
  GetAll() {
    return this.couponService.GetAllCoupons();
  }

  @Get('/:id')
  GetById(@Param('id') id: string) {
    return this.couponService.GetById(Number(id));
  }

  @Post()
  Create(@Body() data: CouponDto) {
    return this.couponService.CreateCoupon(data);
  }

  @Patch(':id')
  Update(@Param('id') id: string, @Body() data: CouponDto) {
    return this.couponService.UpdateCoupon(Number(id), data);
  }

  @Delete(':id')
  Delete(@Param('id') id: string) {
    return this.couponService.DeleteCoupon(Number(id));
  }
}
