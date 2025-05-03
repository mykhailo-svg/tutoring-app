import { forwardRef, Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { DirectMessageController } from './direct-message.controller';
import { DirectMessage, User } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [DirectMessageController],
  providers: [DirectMessageService],
  imports: [
    TypeOrmModule.forFeature([DirectMessage, User]),
    forwardRef(() => UserModule),
  ],
  exports: [DirectMessageService],
})
export class DirectMessageModule {}
