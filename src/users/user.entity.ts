import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  firstName?: string;

  @Column({ default: '' })
  lastName?: string;

  @Column({ default: '' })
  tariff?: string;

  @Column({ type: 'timestamp', default: 'NOW()' })
  created?: Date;

  @Column({ nullable: true, default: null })
  guestSessionId?: string;
}
