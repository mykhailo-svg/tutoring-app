import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { getConfig } from '../../config/config';
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
  userId: number;
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

  async generateAuthTokens(user: User) {
    const config = getConfig();

    const refreshTokenExpires = `${config.jwt.refreshExpirationDays}d`;
    const accessTokenExpires = `${config.jwt.accessExpirationMinutes}m`;

    const refreshToken = this.generateToken({
      expires: refreshTokenExpires,
      user,
    });
    const accessToken = this.generateToken({
      expires: accessTokenExpires,
      user,
    });

    const savedToken = await this.saveToken({
      expires: refreshTokenExpires,
      token: refreshToken,
      type: TokenType.REFRESH,
      userId: user.id,
    });

    console.log(savedToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken({ expires, token, type, userId }: SaveTokenArgs) {
    const newToken: Omit<Token, 'id'> = {
      type,
      value: token,
      user: userId,
      expires,
    };

    return this.tokensRepository.save(newToken);
  }
}
