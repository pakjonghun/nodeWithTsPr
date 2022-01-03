import { Permissions } from "./permission.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./user.entity";

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Users, (u) => u.role)
  users: Users[];

  @ManyToMany(() => Permissions)
  @JoinTable({
    name: "role_permission",
    joinColumn: { name: "role", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission", referencedColumnName: "id" },
  })
  permissions: Permissions[];
}
