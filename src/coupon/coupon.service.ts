import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CouponDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}
  async GetAllCoupons() {
    try {
      const coupon = await this.prisma.coupon.findMany();
      if (coupon) {
        return coupon;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async GetById(id: number) {
    try {
      const coupon = await this.prisma.coupon.findUnique({
        where: {
          id_Coupon: id,
        },
      });
      if (coupon) {
        return coupon;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async CreateCoupon(dto: CouponDto) {
    try {
      const sDate = new Date(dto.start_date);
      const eDate = new Date(dto.end_date);
      const coupon = await this.prisma.coupon.create({
        data: {
          code: dto.code,
          type: dto.type,
          value: dto.value,
          start_date: sDate,
          end_date: eDate,
          min_spend: dto.min_spend,
          max_spend: dto.max_spend,
          uses_per_customer: dto.uses_per_customer,
          uses_per_coupon: dto.uses_per_coupon,
          status: dto.status,
        },
      });
      if (coupon) {
        return coupon;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async UpdateCoupon(id: number, dto: CouponDto) {
    try {
      const sDate = new Date(dto.start_date);
      const eDate = new Date(dto.end_date);
      const coupon = await this.prisma.coupon.update({
        where: {
          id_Coupon: id,
        },
        data: {
          code: dto.code,
          type: dto.type,
          value: dto.value,
          start_date: sDate,
          end_date: eDate,
          min_spend: dto.min_spend,
          max_spend: dto.max_spend,
          uses_per_customer: dto.uses_per_customer,
          uses_per_coupon: dto.uses_per_coupon,
          status: dto.status,
        },
      });
      if (coupon) {
        return coupon;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async DeleteCoupon(id: number) {
    try {
      await this.prisma.coupon.delete({ where: { id_Coupon: id } });
      return {
        msg: 'Coupon deleted successfully',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
