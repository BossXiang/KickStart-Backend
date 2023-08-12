import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products'})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imgSource: string[];

  @Column()
  price: number;

}
