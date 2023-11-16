import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Actions } from './actions.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  fio: string;

  @Column()
  apiToken: string;

  @OneToMany(() => Actions, (action) => action.user)
  actions: Actions[];
}
