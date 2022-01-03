import { OrderItems } from "./orderItem.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => OrderItems, (o) => o.order)
  @JoinColumn({ name: "order_items" })
  orderItems: OrderItems[];

  get name() {
    return `${this.firstname} ${this.lastname}`;
  }

  get totalPrice() {
    return this.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
