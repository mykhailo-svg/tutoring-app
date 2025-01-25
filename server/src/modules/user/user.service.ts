import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities';
import { Repository } from 'typeorm';
import { SafeUser } from '@src/globalTypes';
import * as bcrypt from 'bcrypt';
import { getConfig } from '@src/config';

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

  async uploadUserAvatarImage(file: any, userId: number) {
    const config = getConfig();

    const formData = new FormData();

    formData.append('key', config.ibbImagesStorage.apiKey);
    formData.append('image', file.buffer.toString('base64'));

    const upload = await fetch('https://api.imgbb.com/1/upload', {
      body: formData,
      method: 'POST',
    });

    const uploadData = await upload.json();

    await this.usersRepository.update(
      { id: userId },
      { avatar: uploadData.data },
    );

    return uploadData;
  }

  removeSensitiveData(user: User): SafeUser {
    const safeUser: User = user;

    delete safeUser.password;

    return safeUser;
  }
}
