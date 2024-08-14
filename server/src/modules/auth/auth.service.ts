import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules//user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async checkIfUserExists(dto: CreateUserDto) {
    const existingUser = await this.userService.findExistingUser({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    const createdUser = await this.userService.createUser(dto);

    return createdUser;
  }
}
