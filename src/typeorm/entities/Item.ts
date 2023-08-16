import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.item)
  order: Order;

  @ManyToOne(() => Product, product => product.item)
  product: Product;

  @Column()
  number: number;

  @Column()
  comment: string;
}
