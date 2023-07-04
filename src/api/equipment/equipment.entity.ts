import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Character } from '../character/character.entity';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ name: 'character_id' })
  characterID: number;

  // 武器
  @Column()
  arms: string;

  // 头盔
  @Column()
  helmet: string;

  // 项链
  @Column()
  necklace: string;

  // 衣服
  @Column()
  clothes: string;

  // 腰带
  @Column()
  belt: string;

  // 鞋子
  @Column()
  shoe: string;

  // 戒指
  @Column()
  ring: string;

  // 手镯
  @Column()
  bracelet: string;

  // 耳饰
  @Column()
  earring: string;

  // 佩饰
  @Column()
  trimming: string;

  @Column()
  remark: string;

  @OneToOne(() => Character, (record) => record.equipment)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @Column({ type: 'timestamp', name: 'created_at' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
