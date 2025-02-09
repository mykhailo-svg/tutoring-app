import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DefaultEventsMap, Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  clients: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>[] =
    [];

  onModuleInit() {
    this.server.on('connection', (client) => {
      console.log('Connection...');
      this.clients.push(client);
      console.log(client.id);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() message) {
    console.log('message');

    console.log(this.clients[0].send('hello'));

    this.server.emit('messageResponse', message);
  }
}
