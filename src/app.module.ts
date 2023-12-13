import { Module } from '@nestjs/common';

import { authModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './Category/category.module';
import { ProductModule } from './Products/product.module';
import { CouponModule } from './coupon/coupon.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [configuration],
    }),
    authModule,
    UserModule,
    PrismaModule,
    CategoryModule,
    ProductModule,
    CouponModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderProductModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
