import {
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Item } from './Item';
import { DeliveryInfo } from './DeliveryInfo';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column({nullable: true})
  transactionTime: Date;

  @Column({nullable: true})
  deliveryTime: Date;

  @Column({nullable: true})
  receivenTime: Date;

  @Column()
  comment: string;

  @OneToMany(() => Item, item => item.order, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  item: Item[];

  @OneToOne(() => DeliveryInfo, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  deliveryinfo: DeliveryInfo;
}
