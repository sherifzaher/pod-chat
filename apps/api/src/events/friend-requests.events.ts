import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from 'src/gateway/gateway';
import { ServerEvents, WebsocketEvents } from 'src/utils/constants';
import { FriendRequest } from 'src/utils/typeorm';
import { AcceptFriendRequestResponse } from 'src/utils/types';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent(ServerEvents.FRIEND_REQUEST_CREATED)
  handleFriendRequestCreated(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getSocketId(
      payload.receiver.id,
    );
    receiverSocket && receiverSocket.emit('onFriendRequestReceived', payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_CANCELLED)
  handleFriendRequestCanceled(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getSocketId(
      payload.receiver.id,
    );
    receiverSocket && receiverSocket.emit('onFriendRequestCancelled', payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_ACCEPTED)
  handleAcceptFriendRequest(payload: AcceptFriendRequestResponse) {
    const senderSocket = this.gateway.sessions.getSocketId(
      payload.friendRequest.sender.id,
    );
    senderSocket &&
      senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_ACCEPTED, payload);
  }
}
