import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./order.entity";

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  title: string;

  @ManyToOne(() => Orders, (o) => o.orderItems, { onDelete: "CASCADE" })
  order: Orders;
}
