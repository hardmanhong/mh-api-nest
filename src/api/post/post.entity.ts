import { Exclude } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number

  @IsNotEmpty({ message: '标题不能为空' })
  @Column()
  title: string

  @IsNotEmpty({ message: '内容不能为空' })
  @Column()
  content: string

  @Column({ type: 'timestamp', name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Exclude()
  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
