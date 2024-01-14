// src/entities/Order.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar' })
  debt: string;

  @Column({ type: 'varchar' })
  paid: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'delivery_user_id' })
  deliveryUser: User;

  @Column({ type: 'varchar' })
  accordingTo: string;

  @Column({ type: 'varchar' })
  accordingToNumber: number;

  @Column({ type: 'varchar' })
  accordingToDate: string;

  @Column({ type: 'varchar' })
  warehouse: string;

  @Column({ type: 'varchar' })
  location: string;

  // Assuming 'data' is an array of objects with the specified fields
  @Column({ type: 'jsonb' })
  data: Array<{
    name: string;
    unit: string;
    unitPrice: string;
    accordingTo: string;
    actualInput: string;
    totalPrice: number;
  }>;

  @Column({ type: 'varchar' })
  total: string;

  @Column({ type: 'varchar' })
  totalInWords: string;

  @Column({ type: 'varchar' })
  accompanyingDocument: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'orderIssuer_id' })
  orderIssuer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'deliveryPerson_id' })
  deliveryPerson: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'warehouseKeeper_id' })
  warehouseKeeper: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'accountant_id' })
  accountant: User;
}
