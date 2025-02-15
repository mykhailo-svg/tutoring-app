import { Inject, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import * as jwt from 'jsonwebtoken';
import { getConfig } from '@src/config/config';
import { verifyJwtToken } from '../auth';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GatewayService } from './gateway.service';

@WebSocketGateway({
  cors: { origin: '*' }, // Allow connections from any origin
})
export class MyGateway implements OnModuleInit {
  constructor(private readonly gatewayService: GatewayService) {}

  @WebSocketServer()
  server: Server;

  clients: Record<number, WebSocket> = {};

  onModuleInit() {
    // Handle new WebSocket connection
    this.server.on('connection', async (client: WebSocket, req: Request) => {
      const urlObj = new URL(req.url, `http://${process.env.HOST}`);
      const token = urlObj.searchParams.get('accessToken');

      const payload = verifyJwtToken(token);

      if (!payload?.id) {
        client.close();

        return;
      }
      // // Handle incoming messages from this client
      client.on('message', (message: string) => {
        console.log(message.toString());

        for (const clientId in this.clients) {
          this.clients[clientId].send(
            `${payload.id}:${JSON.parse(message.toString()).data}`,
          );
        }
      });

      // this.clients.push(client);

      // // Handle disconnect
      client.on('close', () => {
        delete this.clients[payload.id];
        this.gatewayService.removeCachedOnlineUser(payload.id);
      });

      this.clients[payload.id] = client;

      this.gatewayService.cacheOnlineUser(payload.id);
    });
  }
}
