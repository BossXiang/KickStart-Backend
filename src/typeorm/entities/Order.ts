import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Item } from './Item';
import { DeliveryInfo } from './DeliveryInfo';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: true })
  productList: object[]; //product with purchase quantity

  @Column()
  state: string;

  @Column()
  payTime: Date;

  @Column()
  deliveryTime: Date;

  @Column()
  transactionTime: Date;

  @Column()
  comment: string;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @OneToOne(() => DeliveryInfo, (deliveryInfo) => deliveryInfo.order)
  deliveryInfo: DeliveryInfo;
}
