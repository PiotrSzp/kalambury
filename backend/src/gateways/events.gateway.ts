import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  counter = 10;
  private logger: Logger = new Logger(EventsGateway.name);

  @WebSocketServer() wss: Server;

  afterInit(server: any): any {
    this.logger.debug('Initialized gateway');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`Client ${client.id} connected!`);
    client.emit('timeToClient', this.counter);
    this.wss.emit('log', `Client ${client.id} connected!`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.debug(`Client ${client.id} disconnected!`);
  }

  @SubscribeMessage('timeReq')
  handleTime(@ConnectedSocket() client: Socket): WsResponse<number> {
    this.logger.debug(`Sending time to ${client.id}`);
    this.counter += 1;
    return { event: 'timeToClient', data: this.counter };
  }

  players = [];

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data): WsResponse<any[]> {
    this.logger.debug(data);
    this.logger.debug(this.players);
    this.players.push(data)
    return { event: 'playersUpdate', data: this.players };
  }
}
