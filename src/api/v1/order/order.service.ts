import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/Item';
import { Order } from 'src/typeorm/entities/Order';
import { DeliveryInfo } from 'src/typeorm/entities/DeliveryInfo';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>, 
    @InjectRepository(Order) private orderRepository: Repository<Order>, 
    @InjectRepository(DeliveryInfo) private deliveryInfoRepository: Repository<DeliveryInfo>, 
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
      relations:['item','deliveryinfo','item.product']
    });
    if(!order){
      throw new NotFoundException('This order does not exist!');
    }
    return order;
  }

  async updateOrder(id: number, updatedData: Order): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: ['item', 'deliveryinfo'] 
    });
    if (!order) {
      throw new NotFoundException('update order not found!');
    }

    // Delete old items and delivery items
    var delDeliveryId = null, delItemId = null;
    if(updatedData.deliveryinfo) delDeliveryId = order.deliveryinfo.id;
    if(updatedData.item) delItemId = order.item.map(i => i.id);

    Object.assign(order, updatedData);
    await this.orderRepository.save(order);

    if(updatedData.deliveryinfo) this.deliveryInfoRepository.delete(delDeliveryId);
    if(updatedData.item) this.itemRepository
      .createQueryBuilder()
      .delete()
      .from(Item)
      .where('id IN (:...ids)', { ids: delItemId })
      .execute();

    return order;
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: ['item', 'deliveryinfo'] 
    });
    if (!order) {
      throw new NotFoundException('delete order not found!');
    }
    if(order.item) {
      order.item.forEach(i => i.order = null)
      await this.itemRepository.remove(order.item);
    }
    if(order.deliveryinfo) await this.deliveryInfoRepository.remove(order.deliveryinfo);
    await this.orderRepository.remove(order);
  }
}
