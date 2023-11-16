import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Actions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  action_time: number;

  @Column()
  request_result: string;

  @Column({ nullable: true })
  temp_c: string;

  @ManyToOne(() => Users, (user) => user.actions)
  user: Users;
}
