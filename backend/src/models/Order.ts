// src/models/Order.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Order {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceType: string;

  @Column()
  description: string;

  @Column()
  pageCount: number;

  @Column()
  urgency: string;

  @Column()
  price: number;

  @Column()
  status: string; // Exemple : 'pending', 'in_progress', 'completed'

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'clientId' })
  client: User;

  @Column()
  clientId: number; // ID du client

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}