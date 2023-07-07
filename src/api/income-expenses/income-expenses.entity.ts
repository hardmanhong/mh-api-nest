import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class IncomeExpenses {
  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number

  @Column()
  type: number

  @Column()
  category: number

  @Column()
  amount: number

  @Column()
  date: string

  @Column()
  remark: string

  @Column({ type: 'timestamp', name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
