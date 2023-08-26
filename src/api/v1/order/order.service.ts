import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderData: Order): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }
  async searchOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where:{
        id
      },
      relations:['item','deliveryInfo','item.product']
    });
    if(!order){
      throw new NotFoundException('This order does not exist!');
    }
    return order;
  }

  async updateOrder(id: number, updataData: Order): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new NotFoundException('update order not found!');
    }
    Object.assign(order, updataData);
    await this.orderRepository.save(order);
    return order;
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new NotFoundException('delete order not found!');
    }
    await this.orderRepository.remove(order);
  }
}
