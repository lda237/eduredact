import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Document } from './Document'; // Adjust the import path if necessary

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ default: 'writer' })
  role: string; // 'client', 'writer', or 'admin'

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth?: Date;

  @OneToMany(() => Document, (document) => document.writer)
  documents: Document[];

  @CreateDateColumn()
  createdAt: Date;
  orders: any;
}