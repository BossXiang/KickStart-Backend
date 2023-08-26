import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.item)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Product, product => product.item)
  @JoinColumn()
  product: Product;

  @Column()
  number: number;

  @Column()
  comment: string;
}
