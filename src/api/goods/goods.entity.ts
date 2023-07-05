import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Buy } from '../buy/buy.entity';
import { Sell } from '../sell/sell.entity';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'min_price' })
  minPrice: string;

  @Column({ name: 'max_price' })
  maxPrice: string;

  // 定义一个 buys 属性，表示 goods 和 buy 的一对多关系
  @OneToMany(() => Buy, (buy) => buy.goods)
  buys: Buy[];

  @OneToMany(() => Sell, (sell) => sell.goods)
  sales: Sell[];
}
