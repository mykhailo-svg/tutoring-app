import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { GatewayService } from './gateway.service';

@Module({ providers: [MyGateway, GatewayService], exports: [GatewayService] })
export class GatewayModule {}
