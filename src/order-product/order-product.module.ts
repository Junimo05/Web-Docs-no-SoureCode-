import { Module } from '@nestjs/common';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from './order-product.service';

@Module({
  controllers: [OrderProductController],
  providers: [OrderProductService]
})
export class OrderProductModule {}
