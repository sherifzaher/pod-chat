import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from '../gateway/gateway';
import { RemoveFriendEventPayload } from '../utils/types';
import { ServerEvents } from '../utils/constants';

@Injectable()
export class FriendsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent(ServerEvents.FRIEND_REMOVED)
  handleRemoveFriend({ friend, userId }: RemoveFriendEventPayload) {
    const { sender, receiver } = friend;
    const socket = this.gateway.sessions.getSocketId(
      receiver.id === userId ? sender.id : receiver.id,
    );
    socket?.emit('onFriendRemoved', friend);
  }
}
