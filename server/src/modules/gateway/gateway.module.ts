import { forwardRef, Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { GatewayService } from './gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectMessage } from '@src/entities';
import { DirectMessageModule } from '../direct-message/direct-message.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [MyGateway, GatewayService],
  exports: [GatewayService],
  imports: [forwardRef(() => DirectMessageModule)],
})
export class GatewayModule {}
