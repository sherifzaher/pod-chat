import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from '../gateway/gateway';
import { FriendRequest } from '../utils/typeorm';
import { ServerEvents, WebsocketEvents } from '../utils/constants';
import { AcceptFriendRequestResponse } from '../utils/types';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent(ServerEvents.FRIEND_REQUEST_CREATED)
  handleFriendRequestCreated(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getSocketId(
      payload.receiver.id,
    );
    receiverSocket &&
      receiverSocket.emit(WebsocketEvents.FRIEND_REQUEST_RECEIVED, payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_CANCELLED)
  handleFriendRequestCanceled(payload: FriendRequest) {
    const receiverSocket = this.gateway.sessions.getSocketId(
      payload.receiver.id,
    );
    receiverSocket &&
      receiverSocket.emit(WebsocketEvents.FRIEND_REQUEST_CANCELLED, payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_ACCEPTED)
  handleAcceptFriendRequest(payload: AcceptFriendRequestResponse) {
    const senderSocket = this.gateway.sessions.getSocketId(
      payload.friendRequest.sender.id,
    );
    senderSocket &&
      senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_ACCEPTED, payload);
  }

  @OnEvent(ServerEvents.FRIEND_REQUEST_REJECTED)
  handleFriendRequestRejected(payload: FriendRequest) {
    const senderSocket = this.gateway.sessions.getSocketId(payload.sender.id);
    senderSocket &&
      senderSocket.emit(WebsocketEvents.FRIEND_REQUEST_REJECTED, payload);
  }
}
