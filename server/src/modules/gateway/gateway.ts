import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import * as jwt from 'jsonwebtoken';
import { getConfig } from '@src/config/config';

@WebSocketGateway({
  cors: { origin: '*' }, // Allow connections from any origin
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  clients: WebSocket[] = [];

  onModuleInit() {
    // Handle new WebSocket connection
    this.server.on('connection', (client: WebSocket) => {
      // const token = this.getTokenFromQuery(req.url);

      // console.log(req.url);

      // // Handle incoming messages from this client
      // client.on('message', (message: string) => {
      //   this.handleMessage(message, client);
      // });

      // this.clients.push(client);

      // // Handle disconnect
      // client.on('close', () => {
      //   this.handleDisconnect(client);
      // });

      this.clients.push(client);
      client.send('hello');
    });
  }

  // getTokenFromQuery(url: string): string | null {
  //   const urlObj = new URL(url, `http://${process.env.HOST}`);
  //   return urlObj.searchParams.get('token');
  // }

  // handleMessage(message: string, client: WebSocket) {
  //   console.log(message);
  // }

  // handleDisconnect(client: WebSocket) {
  //   this.clients = this.clients.filter((c) => c !== client);
  //   console.log('A client disconnected');
  // }

  // broadcastMessage(message: string) {
  //   // Broadcast to all connected clients
  //   this.clients.forEach((client) => {
  //     client.send(message);
  //   });
  // }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() message: string) {
    console.log('Message received:', message);

    console.log(this.clients.length);

    for (const client of this.clients) {
      client.send(message);
    }

    // This can be used for handling specific client-to-server messages if needed
  }
}
