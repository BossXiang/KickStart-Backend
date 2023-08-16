import { Controller, Get, Delete, Post, Put, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';

@Controller('api/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrder() {}

  @Post()
  createOrder(@Body() input_obj: CreateOrderDto) {
    return this.orderService.createOrder(input_obj);
  }
}
