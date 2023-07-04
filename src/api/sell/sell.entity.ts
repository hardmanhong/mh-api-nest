import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Buy } from '../buy/buy.entity';

@Entity()
export class Sell {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ name: 'buy_id' })
  buyId: number;

  @Column({ name: 'goods_id' })
  goodsId: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  profit: number;

  @Column()
  remark: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Buy, (buy) => buy.sales)
  @JoinColumn({ name: 'buy_id' })
  buy: Buy;
}
