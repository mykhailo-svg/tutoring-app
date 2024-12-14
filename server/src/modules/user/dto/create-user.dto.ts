import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from '@src/globalTypes';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description:
      'Min length 8,required 1 special symbol,uppercase letter,number,lowercase letter ',
    default: 'pasSword_123',
  })
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  password: string;

  @IsString()
  @ApiProperty({ description: 'Length 4-40', default: 'Name Surname' })
  @Length(4, 40)
  name: string;

  @ApiProperty({
    default: 'email@gmail.com',
  })
  @IsEmail()
  email: string;

  @IsEnum(USER_ROLE)
  @ApiProperty({
    enum: USER_ROLE,
    description: 'User role',
  })
  role: USER_ROLE;
}
