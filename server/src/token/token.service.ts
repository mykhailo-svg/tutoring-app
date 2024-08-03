import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { getConfig } from 'src/config/config';
import * as jwt from 'jsonwebtoken';
import { Token, TokenType } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type GenerateTokenArgs = {
  expires: string;
  user: User;
};

type SaveTokenArgs = {
  token: string;
  type: TokenType;
  expires: string;
};

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  generateToken({ expires, user }: GenerateTokenArgs) {
    const config = getConfig();

    const token = jwt.sign(user, config.jwt.secretKey, { expiresIn: expires });

    return token;
  }

  generateAuthTokens(user: User) {
    const refreshToken = this.generateToken({ expires: '300', user });
    const accessToken = this.generateToken({ expires: '300', user });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken({}: SaveTokenArgs) {}
}
