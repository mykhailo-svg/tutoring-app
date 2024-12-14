import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from '@src/globalTypes';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'User id' })
  id: number;

  @Column()
  @ApiProperty({ required: true, description: 'User name (Name Surname)' })
  name: string;

  @Column()
  @ApiProperty({ required: true, description: 'User email' })
  email: string;

  @Column()
  @ApiProperty({
    required: true,
    description: 'User hashed password',
  })
  password: string;

  @Column({ default: false })
  @ApiProperty({ default: false, description: 'Is user email verified' })
  isEmailVerified: boolean;

  @Column({ enum: USER_ROLE, type: 'enum' })
  role: USER_ROLE;
}
