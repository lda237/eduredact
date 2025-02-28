import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string; // Ensure this property exists

  @Column() // Ensure this property exists
  content: string;

  @Column()
  type: string; // 'identity', 'diploma', 'proof_of_address'

  @ManyToOne(() => User, (user) => user.documents)
  writer: User;

  @Column()
  writerId: number;
}