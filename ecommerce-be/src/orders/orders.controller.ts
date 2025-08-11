import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto/create-order.dto';

@Controller('orders')
export class OrdersController {
      constructor(private svc: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(Number(id));
  }
}
