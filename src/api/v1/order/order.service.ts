import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/Item';
import { Order } from 'src/typeorm/entities/Order';
import { DeliveryInfo } from 'src/typeorm/entities/DeliveryInfo';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>, 
    @InjectRepository(Order) private orderRepository: Repository<Order>, 
    @InjectRepository(DeliveryInfo) private deliveryInfoRepository: Repository<DeliveryInfo>, 
    private emailService: EmailService,
  ) {}

  async createOrder(orderData: Order): Promise<Order> {
    // uuid example: 65e91711-8cd4-44e2-90a8-704e59f05a78
    const uid = uuid4(); 
    const email = orderData.deliveryinfo.email;
    orderData = { 
      id: uid,  
      status: "processing",
      deliveryTime: null,
      receivenTime: null,
      ...orderData };
    const order = this.orderRepository.create(orderData);
    const savedData = await this.orderRepository.save(order);
    this.emailService.sendOrderConfirmationEmail(email, savedData);
    return savedData
  }

  async searchOrder(id: string): Promise<Order> {
    console.log(id);
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

  async updateOrder(id: string, updatedData: Order): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: ['item', 'deliveryinfo'] 
    });
    if (!order) {
      throw new NotFoundException('update order not found!');
    }

    // Store ids of old items and delivery items
    var delDeliveryId = null, delItemId = null;
    if(updatedData.deliveryinfo) delDeliveryId = order.deliveryinfo.id;
    if(updatedData.item) delItemId = order.item.map(i => i.id);

    Object.assign(order, updatedData);
    await this.orderRepository.save(order);

    // Delete Old items and old deliveryinfo
    if(updatedData.deliveryinfo) this.deliveryInfoRepository.delete(delDeliveryId);
    if(updatedData.item) this.itemRepository
      .createQueryBuilder()
      .delete()
      .from(Item)
      .where('id IN (:...ids)', { ids: delItemId })
      .execute();

    return order;
  }

  async deleteOrder(id: string): Promise<void> {
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
