import { forwardRef, Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { GatewayService } from './gateway.service';
import { DirectMessageModule } from '../direct-message/direct-message.module';

@Module({
  providers: [MyGateway, GatewayService],
  exports: [GatewayService],
  imports: [forwardRef(() => DirectMessageModule)],
})
export class GatewayModule {}
