import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ default: '' })
  @ApiProperty({
    required: false,
    default: '',
  })
  firstName?: string;

  @Column({ default: '' })
  @ApiProperty({
    required: false,
    default: '',
  })
  lastName?: string;

  @Column({ default: '' })
  @ApiProperty({
    required: false,
    default: '',
  })
  tariff?: string;

  @Column({ type: 'timestamp', default: 'NOW()' })
  @ApiProperty({
    required: false,
  })
  created?: Date;

  @ApiProperty({
    required: false,
  })
  @Column({ nullable: true, default: null })
  guestSessionId?: string;
}
