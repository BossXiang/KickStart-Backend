import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { Order } from './Order';

@Entity()
export class DeliveryInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order, (order) => order.deliveryInfo)
  @JoinColumn()
  order: Order;

  @Column()
  email:string;

  @Column()
  firstName:string;

  @Column()
  lastName:string;

  @Column()
  address:string;

  @Column()
  country:string;
}
