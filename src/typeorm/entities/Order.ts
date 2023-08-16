import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
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

  // @OneToMany(() => Item, (item) => item.order)
  // item: Item[];

  @OneToOne(() => DeliveryInfo)
  @JoinColumn()
  deliveryInfo: DeliveryInfo;
}
