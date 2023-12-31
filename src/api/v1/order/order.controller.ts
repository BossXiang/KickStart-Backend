import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { Order } from 'src/typeorm/entities/Order';

@Controller('api/v1/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':id')
  searchOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.searchOrder(id);
  }

  @Post()
  createOrder(@Body() input_obj: Order) {
    return this.orderService.createOrder(input_obj);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateData: Order,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
