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

  @Column()
  status: string;

  @Column()
  payTime: Date;

  @Column()
  deliveryTime: Date;

  @Column()
  transactionTime: Date;

  @Column()
  comment: string;

  @OneToMany(() => Item, item => item.order)
  @JoinColumn()
  item: Item[];

  @OneToOne(() => DeliveryInfo, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  deliveryInfo: DeliveryInfo;
}
