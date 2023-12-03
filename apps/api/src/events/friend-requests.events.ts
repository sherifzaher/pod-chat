import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from 'src/gateway/gateway';
import { FriendRequest } from 'src/utils/typeorm';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friend.request.created')
  handleFriendRequestCreated(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getSocketId(
      payload.receiver.id,
    );
    if (receiverSocket) receiverSocket.emit('onFriendRequestReceived', payload);
  }

  @OnEvent('friend.request.cancelled')
  handleFriendRequestCanceled(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getSocketId(
      payload.receiver.id,
    );
    if (receiverSocket)
      receiverSocket.emit('onFriendRequestCancelled', payload);
  }
}
