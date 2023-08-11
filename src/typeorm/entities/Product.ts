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
  imgSource: string;   // Should be array of string

  @Column()
  price: number;

}
