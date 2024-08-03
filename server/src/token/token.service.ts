import { Injectable } from '@nestjs/common';
import { TokenType } from './entities/token.entity';
import { User } from 'src/user/entities/user.entity';
import jwt from 'jsonwebtoken';

type GenerateTokenArgs = {
  expires: string;
  type: TokenType;
  user: User;
};

@Injectable()
export class TokenService {
  async generateToken({ type, expires, user }: GenerateTokenArgs) {


    const token = jwt.sign(user,"sds",)

  }

  async generateAuthTokens() {}
}
