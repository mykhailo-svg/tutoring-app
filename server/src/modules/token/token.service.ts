import { Injectable } from '@nestjs/common';
import { getConfig } from '../../config/config';
import * as jwt from 'jsonwebtoken';
import { Token, User, TokenType } from '@entities';
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

  generateToken({ expires, user: { id, email } }: GenerateTokenArgs) {
    const config = getConfig();

    const token = jwt.sign({ id, email }, config.jwt.secretKey, {
      expiresIn: expires,
      algorithm: 'HS256',
    });

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

    await this.saveToken({
      expires: refreshTokenExpires,
      token: refreshToken,
      type: TokenType.REFRESH,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken({ expires, token, type, userId }: SaveTokenArgs) {
    await this.tokensRepository.delete({
      type,
      user: userId,
    });

    const newToken: Omit<Token, 'id'> = {
      type,
      value: token,
      user: userId,
      expires,
    };

    return this.tokensRepository.save(newToken);
  }

  async getRefreshToken(refreshToken: string) {
    return await this.tokensRepository.findOne({
      where: { value: refreshToken, type: TokenType.REFRESH },
    });
  }

  async removeRefreshToken(refreshToken: string) {
    await this.tokensRepository.delete({
      value: refreshToken,
      type: TokenType.REFRESH,
    });
  }
}
