import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { Order } from 'src/typeorm/entities/Order';

@Controller('api/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  searchOrder(@Param('id', ParseIntPipe) id: number):Promise<Order>{
    return this.orderService.searchOrder(id);
  }

  @Post()
  createOrder(@Body() input_obj: Order) {
    return this.orderService.createOrder(input_obj);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Order,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
