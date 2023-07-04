import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Character } from '../character/character.entity';
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column()
  server: string;

  @OneToMany(() => Character, (character) => character.account)
  characters: Character[];

  @Column({ type: 'timestamp', name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
