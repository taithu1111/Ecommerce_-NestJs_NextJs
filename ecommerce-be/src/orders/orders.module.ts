import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity/order.entity';
import { OrderItem } from './order-item.entity/order-item.entity';
import { Product } from 'src/products/product.entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
