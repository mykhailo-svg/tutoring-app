import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities';
import { AppService } from '../app/app.service';
import { GatewayService } from '../gateway/gateway.service';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AppService, GatewayService],
  imports: [TypeOrmModule.forFeature([User]), GatewayModule],
  exports: [UserService],
})
export class UserModule {}
