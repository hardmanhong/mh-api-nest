import { Exclude, Transform } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Goods } from '../goods/goods.entity'
import { Sell } from '../sell/sell.entity'
export class ColumnNumericTransformer {
  to(data: number): number {
    return data
  }
  from(data: string): number {
    return parseFloat(data)
  }
}
@Entity()
export class Buy {
  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number

  @Column({ name: 'goods_id' })
  goodsId: number

  @Column()
  price: number

  @Column()
  quantity: number

  @Column()
  inventory: number

  @Column({ name: 'total_amount' })
  @Transform(
    (params) => {
      const obj = params.obj
      return obj.price * obj.quantity
    },
    { toPlainOnly: true }
  )
  totalAmount: number

  @Column({
    name: 'total_profit',
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  totalProfit: number

  @Column({ name: 'has_sold' })
  hasSold: number

  @Column()
  remark: string

  @Column({ type: 'timestamp', name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  // 定义一个 goods 属性，表示 buy 和 goods 的多对一关系
  @ManyToOne(() => Goods, (goods) => goods.buys)
  @JoinColumn({ name: 'goods_id' })
  goods: Goods

  // 定义一个 sales 属性
  @OneToMany(() => Sell, (sell) => sell.buy)
  sales: Sell[]
}
