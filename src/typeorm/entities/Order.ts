import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders'})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: object[];

  @Column()
  state: string;

  @Column()
  payTime: Date;

  @Column()
  deliveryTime: Date;

  @Column()
  transactionTime: Date;

  @Column()
  deliveryInfo: object;
}
