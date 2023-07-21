import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Buy } from '../buy/buy.entity'
import { Sell } from '../sell/sell.entity'

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ name: 'min_price' })
  minPrice: number

  @Column({ name: 'max_price' })
  maxPrice: number

  // 定义一个 buys 属性，表示 goods 和 buy 的一对多关系
  @OneToMany(() => Buy, (buy) => buy.goods)
  buys: Buy[]

  @OneToMany(() => Sell, (sell) => sell.goods)
  sales: Sell[]
}
