import { Column, Entity, PrimaryGeneratedColumn,OneToOne, JoinColumn } from "typeorm";
import { Item } from "./Item";

@Entity({ name: 'products'})
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

  @OneToOne(()=>Item,item=>item.product)
  @JoinColumn()
  item:Item;

}
