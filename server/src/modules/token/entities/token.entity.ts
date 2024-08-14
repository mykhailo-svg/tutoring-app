import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TokenType {
  RESET_PASSWORD = 'resetPassword',
  REFRESH = 'refresh',
  EMAIL_VERIFICATION = 'emailVerification',
}

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ type: 'enum', enum: TokenType, default: TokenType.REFRESH })
  type: TokenType;

  @Column()
  expires: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Column()
  user: number;
}
