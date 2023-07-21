import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Character } from '../character/character.entity'

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @Column({ name: 'character_id' })
  characterID: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  level: number

  @Column()
  remark: string

  @ManyToOne(() => Character, (record) => record.pets)
  @JoinColumn({ name: 'character_id' })
  character: Character

  @Column({ type: 'timestamp', name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string
}
