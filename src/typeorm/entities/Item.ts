import { Column, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity({ name: 'item' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.item)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column()
  number: number;

  @Column()
  content: string;

  @Column()
  prompt: string;
  
  @Column('simple-array')
  images: string[];

  @Column()
  comment: string;
}
