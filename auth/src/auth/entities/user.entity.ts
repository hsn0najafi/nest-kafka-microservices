import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column()
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}
