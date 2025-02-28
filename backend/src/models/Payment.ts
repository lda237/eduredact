import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Order } from './Order'; // Assurez-vous d'importer le modèle Order

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: ['stripe', 'mobile-money'], default: 'stripe' })
  method: string;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed'], default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relation avec la commande (Order)
  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: number; // Clé étrangère vers la table Order
  paymentMethod: string;
}