import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: 'User password',
    default: 'pasSword_123',
  })
  password: string;

  @ApiProperty({
    default: 'email@gmail.com',
  })
  @IsEmail()
  email: string;
}
