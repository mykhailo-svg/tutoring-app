import { forwardRef, Inject, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { verifyJwtToken } from '../auth';
import { GatewayService } from './gateway.service';
import { GATEWAY_MESSAGE_TYPE } from './constants';
import { UserService } from '../user/user.service';
import { DirectMessageService } from '../direct-message/direct-message.service';

@WebSocketGateway({
  cors: { origin: '*' }, // Allow connections from any origin
})
export class MyGateway implements OnModuleInit {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject(forwardRef(() => DirectMessageService))
    private directMessagesService: DirectMessageService,
  ) {}

  @WebSocketServer()
  server: Server;

  clients: Record<number, WebSocket> = {};

  onModuleInit() {
    // Handle connection
    this.server.on('connection', async (client: WebSocket, req: Request) => {
      const urlObj = new URL(req.url, `http://${process.env.HOST}`);
      const token = urlObj.searchParams.get('accessToken');

      const payload = verifyJwtToken(token);

      if (!payload?.id) {
        client.close();

        return;
      }

      // Handle message
      client.on('message', (message: string) => {
        console.log(message.toString());

        const parsedMessage: { payload?: { message: string; to: number } } =
          JSON.parse(message.toString());
        console.log('message');

        this.directMessagesService.createDirectMessage({
          message: {
            recipientId: parsedMessage.payload.to,
            senderId: payload.id,
            content: parsedMessage.payload.message,
          },
        });
        if (this.clients[parsedMessage?.payload?.to]) {
          this.clients[parsedMessage.payload.to].send(
            JSON.stringify({
              type: GATEWAY_MESSAGE_TYPE.MESSAGE,
              payload: {
                initiator: payload.id,
                message: parsedMessage.payload.message,
              },
            }),
          );
        }
      });

      // // Handle disconnect
      client.on('close', () => {
        delete this.clients[payload.id];

        for (const clientId in this.clients) {
          this.clients[clientId].send(
            JSON.stringify({
              type: GATEWAY_MESSAGE_TYPE.USER_DISCONNECTED,
              payload: { userId: payload.id },
            }),
          );
        }

        this.gatewayService.removeCachedOnlineUser(payload.id);
      });

      for (const clientId in this.clients) {
        this.clients[clientId].send(
          JSON.stringify({
            type: GATEWAY_MESSAGE_TYPE.USER_CONNECTED,
            payload: { userId: payload.id },
          }),
        );
      }

      this.clients[payload.id] = client;

      this.gatewayService.cacheOnlineUser(payload.id);
    });
  }
}
