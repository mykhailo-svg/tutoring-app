import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from 'src/modules/token/token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, TokenModule],
})
export class AuthModule {}
