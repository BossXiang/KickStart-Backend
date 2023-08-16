import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './Item';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('simple-array')
  imgSource: string[];

  @Column()
  price: number;

  // @OneToMany(() => Item, (item) => item.product)
  // item: Item;
}
