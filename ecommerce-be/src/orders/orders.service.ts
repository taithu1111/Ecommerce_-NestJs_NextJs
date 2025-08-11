import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity/order-item.entity';
import { Product } from 'src/products/product.entity/product.entity';
import { CreateOrderDto } from './dto/create-order.dto/create-order.dto';

@Injectable()
export class OrdersService {
      constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemsRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async create(dto: CreateOrderDto) {
    let total = 0;
    const items: OrderItem[] = [];

     for (const it of dto.items) {
      const product = await this.productsRepo.findOneBy({ id: it.productId });
      if (!product) throw new NotFoundException(`Product ${it.productId} not found`);
      if (product.stock < it.quantity) throw new BadRequestException(`Not enough stock for product ${product.id}`);
      const price = Number(product.price);
      total += price * it.quantity;
      product.stock -= it.quantity;
      await this.productsRepo.save(product);

       const orderItem = this.itemsRepo.create({
        product,
        productId: product.id,
        quantity: it.quantity,
        price,
      });
      items.push(orderItem);

         const order = this.ordersRepo.create({
      userId: dto.userId,
      total,
      items,
    });

    return this.ordersRepo.save(order);
    }
  }

   findAll() {
    return this.ordersRepo.find();
  }

  findOne(id: number) {
    return this.ordersRepo.findOneBy({ id });
  }

}
  



