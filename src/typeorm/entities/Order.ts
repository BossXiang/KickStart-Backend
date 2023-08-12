import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders'})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: true })
  productList: object[];  //product with purchase quantity

  @Column()
  state: string;

  @Column()
  payTime: Date;

  @Column()
  deliveryTime: Date;

  @Column()
  transactionTime: Date;

  @Column('json', { nullable: true })
  deliveryInfo: object;
}
