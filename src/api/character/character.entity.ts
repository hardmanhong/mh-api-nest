import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Equipment } from '../equipment/equipment.entity';
import { Pet } from '../pet/pet.entity';
import { Account } from '../account/account.entity';
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ name: 'account_id' })
  accountId: number;

  @Column()
  name: string;

  // 造型
  @Column()
  molding: string;

  // 门派
  @Column()
  sect: string;

  @Column()
  level: string;

  @Column()
  remark: string;

  @ManyToOne(() => Account, (account) => account.characters)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToOne(() => Equipment, (equipment) => equipment.character)
  equipment: Equipment;

  @OneToMany(() => Pet, (pet) => pet.character)
  pets: Pet[];

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
