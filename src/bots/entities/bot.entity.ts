import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('bots')
export class Bot extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'Primary Key' })
  id: number;

  @Column({ type: 'integer' })
  user_id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  purpose: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @ManyToOne(() => User, (user) => user.bots)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
