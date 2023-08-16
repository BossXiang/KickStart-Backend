import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from 'src/typeorm/entities/Order';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/Item';
import { DeliveryInfo } from 'src/typeorm/entities/DeliveryInfo';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Item, DeliveryInfo])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
