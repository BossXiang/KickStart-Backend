import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,OneToOne, JoinColumn, } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @OneToOne(()=>Product,product=>product.item)
  @JoinColumn()
  product:Product;

  @Column()
  number:number;

  @Column()
  comment:string;
}
