import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SafeUser } from '@src/globalTypes';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto) {
    const userData = { ...body };

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    return this.usersRepository.save(userData);
  }

  async findExistingUser({ email }: { email: string }) {
    return this.usersRepository.findOneBy({ email });
  }

  async getById({ id }: { id: number }) {
    return this.usersRepository.findOneBy({ id });
  }

  removeSensitiveData(user: User): SafeUser {
    const safeUser: User = user;

    delete safeUser.password;

    return safeUser;
  }
}
