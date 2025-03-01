import { forwardRef, Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { DirectMessageController } from './direct-message.controller';
import { DirectMessage } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  controllers: [DirectMessageController],
  providers: [DirectMessageService],
  imports: [
    TypeOrmModule.forFeature([DirectMessage]),
    forwardRef(() => UserModule),
  ],
  exports: [DirectMessageService],
})
export class DirectMessageModule {}
