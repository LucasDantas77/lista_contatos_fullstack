import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { getRounds, hashSync } from "bcryptjs";
import { Contacts } from "./contacts.entities";

@Entity("user")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "numeric" })
  fone: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @OneToMany(()=> Contacts,( contacts) => contacts.user)
  contacts: Contacts[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPass() {
    const passHash = getRounds(this.password);
    if (!passHash) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export { User };
